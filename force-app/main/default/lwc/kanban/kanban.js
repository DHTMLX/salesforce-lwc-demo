/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
import { LightningElement, api, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript, loadStyle } from "lightning/platformResourceLoader";

// ─────────────────────────────────────────────────────────────────────────────
// Static resources
import RESIZE_OBSERVER from "@salesforce/resourceUrl/ro";
import KanbanFiles from "@salesforce/resourceUrl/dhtmlxkanban";
import Fonts from "@salesforce/resourceUrl/fonts";

// Apex controllers
import getColumns from "@salesforce/apex/KanbanData.getColumns";
import getRows from "@salesforce/apex/KanbanData.getRows";
import getCards from "@salesforce/apex/KanbanData.getCards";
import getUsers from "@salesforce/apex/KanbanData.getUsers";

//APEX methods
import createCard from "@salesforce/apex/KanbanData.createCard";
import updateCard from "@salesforce/apex/KanbanData.updateCard";
import deleteCard from "@salesforce/apex/KanbanData.deleteCard";
import createColumn from "@salesforce/apex/KanbanData.createColumn";
import updateColumn from "@salesforce/apex/KanbanData.updateColumn";
import deleteColumn from "@salesforce/apex/KanbanData.deleteColumn";
import createRow from "@salesforce/apex/KanbanData.createRow";
import updateRow from "@salesforce/apex/KanbanData.updateRow";
import deleteRow from "@salesforce/apex/KanbanData.deleteRow";
import addVote from "@salesforce/apex/KanbanData.addVote";
import deleteVote from "@salesforce/apex/KanbanData.deleteVote";
import addComment from "@salesforce/apex/KanbanData.addComment";
import deleteComment from "@salesforce/apex/KanbanData.deleteComment";
import updateComment from "@salesforce/apex/KanbanData.updateComment";
import uploadAttachment from "@salesforce/apex/KanbanData.uploadAttachment";
import getLinks from "@salesforce/apex/KanbanData.getLinks";
import createLink from "@salesforce/apex/KanbanData.createLink";
import updateLink from "@salesforce/apex/KanbanData.updateLink";
import deleteLink from "@salesforce/apex/KanbanData.deleteLink";
// Current user
import USER_ID from "@salesforce/user/Id";

export default class Kanban extends LightningElement {
  static delegatesFocus = true;

  // Public API
  @api height;

  // Flags
  kanbanLibLoaded = false;
  kanbanLoadStarted = false;
  kanbanInitialized = false;

  // Kanban instance
  board = null;
  toolbar = null;

  // Current user ID
  currentUserId = USER_ID;

  // Raw data from server
  rawColumns = null;
  rawRows = null;
  rawCards = null;
  rawUsers = null;
  rawLinks = null;

  // Converted to dhtmlx kanban format
  columnsData = [];
  rowsData = [];
  cardsData = [];
  usersData = [];
  linksData = [];

  tempIdsMap = {};

  // Wires
  @wire(getColumns)
  wiredColumns({ error, data }) {
    if (data) {
      this.rawColumns = data.columns || [];
      this.buildColumns();
    } else if (error) {
      this.rawColumns = [];
      this.toastError("Error fetching columns", error);
    }
  }

  @wire(getRows)
  wiredRows({ error, data }) {
    if (data) {
      this.rawRows = data.rows || [];
      this.buildRows();
    } else if (error) {
      this.rawRows = [];
      this.toastError("Error fetching rows", error);
    }
  }

  @wire(getCards)
  wiredCards({ error, data }) {
    if (data) {
      this.rawCards = data.cards || [];
      this.buildCards();
      this.maybeInitializeBoard();
    } else if (error) {
      this.rawCards = [];
      this.toastError("Error fetching cards", error);
    }
  }

  @wire(getUsers)
  wiredUsers({ error, data }) {
    if (data) {
      this.rawUsers = data || [];
      this.usersData = this.rawUsers.map((u) => ({
        id: u.id,
        label: u.label,
        avatar: u.avatar
      }));
      this.maybeInitializeBoard();
    } else if (error) {
      this.rawUsers = [];
      this.usersData = [];
      this.toastError("Error fetching users", error);
    }
  }

  @wire(getLinks)
  wiredLinks({ error, data }) {
    if (data) {
      this.rawLinks = data.links || [];
      this.linksData = this.rawLinks.map((l) => ({
        id: l.id,
        masterId: l.masterId,
        slaveId: l.slaveId,
        relation: l.relation
      }));
      this.maybeInitializeBoard();
    } else if (error) {
      this.rawLinks = [];
      this.toastError("Error fetching links", error);
    }
  }

  renderedCallback() {
    if (this.kanbanLoadStarted) return;
    this.kanbanLoadStarted = true;

    Promise.all([
      loadScript(this, RESIZE_OBSERVER),
      loadScript(this, `${KanbanFiles}/dist/kanban.js`),
      loadStyle(this, `${KanbanFiles}/dist/kanban.css`),
      loadStyle(this, `${Fonts}/wxi/wx-icons.css`),
      loadStyle(this, `${Fonts}/roboto/roboto.css`)
    ])
      .then(() => {
        this.kanbanLibLoaded = true;
        this.maybeInitializeBoard();
      })
      .catch((error) =>
        this.toastError("Error loading Kanban libraries", error)
      );
  }

  updateData(data) {
    this.board?.parse(data);
  }

  maybeInitializeBoard() {
    if (!this.kanbanLibLoaded || !this.usersData.length) {
      return;
    }
    this.initializeUI();
    this.kanbanInitialized = true;
    this.showToast(
      "Important Notice",
      "Please be aware that the demo data is automatically reset every hour.",
      "warning"
    );
  }

  buildColumns() {
    this.columnsData = this.rawColumns.map((c) => ({
      id: c.Id,
      label: c.Label__c,
      collapsed: Boolean(c.Collapsed__c),
      css: c.CssClass__c,
      limit: c.Limit__c != null ? Number(c.Limit__c) : undefined,
      strictLimit: Boolean(c.StrictLimit__c),
      overlay: c.Overlay__c ? JSON.parse(c.Overlay__c) : undefined
    }));
    this.updateData({ columns: this.columnsData });
  }

  buildRows() {
    this.rowsData = this.rawRows.map((r) => ({
      id: r.Id,
      label: r.Label__c,
      collapsed: Boolean(r.Collapsed__c),
      css: r.CssClass__c
    }));
    this.updateData({ rows: this.rowsData });
  }

  buildCards() {
    const priorityMap = { High: 1, Medium: 2, Low: 3 };
    const links = new Map();

    this.cardsData = this.rawCards.map((item) => {
      const usersArr = this.mapRel(item.KanbanUsers__r, (u) => u.User__c);

      const attachedArr = this.mapRel(item.KanbanAttachments__r, (att) => ({
        id: att.Id,
        url: att.Url__c,
        previewURL: att.PreviewURL__c,
        coverURL: att.CoverURL__c,
        name: att.Name,
        isCover: Boolean(att.IsCover__c)
      }));

      const commentsArr = this.mapRel(item.KanbanComments__r, (c) => ({
        id: c.Id,
        userId: c.User__c,
        cardId: item.Id,
        text: c.Text__c,
        date: new Date(c.CreatedDate)
      }));

      const votesArr = this.mapRel(item.KanbanVotes__r, (v) => v.User__c);

      this.mapRel(item.MasterLinks__r, (l) => {
        links.set(l.Id, {
          id: l.Id,
          masterId: l.MasterCard__c,
          slaveId: l.SlaveCard__c,
          relation: l.Relation__c
        });
      });
      this.mapRel(item.SlaveLinks__r, (l) => {
        links.set(l.Id, {
          id: l.Id,
          masterId: l.MasterCard__c,
          slaveId: l.SlaveCard__c,
          relation: l.Relation__c
        });
      });

      return {
        id: item.Id,
        label: item.Name,
        description: item.Description__c,
        progress:
          item.Progress__c != null ? Number(item.Progress__c) : undefined,
        start_date: item.StartDate__c ? new Date(item.StartDate__c) : null,
        end_date: item.EndDate__c ? new Date(item.EndDate__c) : null,
        attached: attachedArr,
        color: item.Color__c,
        users: usersArr,
        priority: priorityMap[item.Priority__c] || 3,
        css: item.CssClass__c,
        votes: votesArr,
        comments: commentsArr,
        column: item.ColumnApiName__c,
        row: item.RowApiName__c
      };
    });
    this.linksData = Array.from(links.values());
    this.updateData({ cards: this.cardsData, links: this.linksData });
  }

  getCardShape() {
    return {
      label: true,
      description: true,
      progress: true,
      comments: true,
      votes: {
        show: true,
        clickable: true
      },
      start_date: true,
      end_date: true,
      users: {
        show: true,
        values: this.usersData
      },
      priority: {
        show: true,
        values: [
          { id: 1, color: "#FF5252", label: "High", value: 1 },
          { id: 2, color: "#FFC975", label: "Medium", value: 2 },
          { id: 3, color: "#65D3B3", label: "Low", value: 3 }
        ]
      },
      color: true,
      menu: true,
      cover: true,
      attached: true
    };
  }

  mapRel(rel, mapper) {
    if (!rel) return [];
    if (Array.isArray(rel)) return rel.map(mapper);
    if (Array.isArray(rel.records)) return rel.records.map(mapper);
    return [];
  }

  initializeUI() {
    window.kanban.enableSalesForce();
    const root = this.template.querySelector(".thekanban");
    const toolbar = this.template.querySelector(".toolbar");
    if (this.board) {
      this.board?.destructor();
      this.toolbar?.destructor();
      this.toolbar = null;
      this.board = null;
    }

    if (!root) {
      this.toastError("Kanban root element not found");
      return;
    }

    const kanban = window.kanban;
    if (!kanban || !kanban.Kanban) {
      this.toastError("Kanban library not loaded");
      return;
    }

    const cardShape = this.getCardShape();
    const dhxKanban = new kanban.Kanban(root, {
      columns: this.columnsData,
      rows: this.rowsData,
      cards: this.cardsData,
      links: this.linksData,
      rowKey: "row",
      cardShape,
      currentUser: this.currentUserId,
      editorShape: [
        ...kanban.defaultEditorShape,
        {
          type: "links",
          key: "links",
          label: "Links"
        },
        {
          key: "attached",
          type: "files",
          label: "Files",
          uploadURL: async (rec) => {
            let base64;
            try {
              base64 = await new Promise((resolve, reject) => {
                const fr = new FileReader();
                fr.onload = () => resolve(fr.result.split(",")[1]); // cut “data:*/*;base64,”
                fr.onerror = () => reject(fr.error);
                fr.readAsDataURL(rec.file);
              });
            } catch (err) {
              console.error("FileReader error", err);
              toast("Upload error", "Failed to read file");
              return { id: rec.id, status: "error" };
            }

            try {
              const res = await uploadAttachment({
                fileName: rec.file.name,
                base64Body: base64
              });
              rec.status = "server";
              rec.url = res.url;
              rec.previewURL = res.previewURL;
              rec.name = res.name;

              return {
                fileId: res.id,
                status: "server",
                file: rec.file,
                name: res.name,
                ...res,
                id: rec.id
              };
            } catch (err) {
              const msg = err?.body?.message ?? err?.message ?? "Unknown error";
              console.error("Upload Apex error", err);
              toast("Upload error", msg);
              return { id: rec.id, status: "error" };
            }
          }
        },
        {
          type: "comments",
          key: "comments",
          label: "Comments",
          config: {
            placement: "editor"
          }
        }
      ],

      theme: { name: "material", fonts: false }
    });

    const api = dhxKanban.api;
    this.board = dhxKanban;
    this.toolbar = new kanban.Toolbar(toolbar, {
      api,
      items: ["search", "spacer", "sort", "addColumn", "addRow"]
    });

  /* ========== COLUMNS ========== */

    api.on("add-column", ({ column, id }) => {
      createColumn({ columnJson: JSON.stringify(column) })
        .then((newId) => {
          this.tempIdsMap[id] = newId;
        })
        .catch((e) => this.toastError("Error creating column", e));
    });

    api.on("update-column", ({ id, column }) => {
      if (this.tempIdsMap[id]) {
        id = this.tempIdsMap[id];
      }
      updateColumn({
        columnId: id,
        columnJson: JSON.stringify({ ...column, id })
      }).catch((e) => this.toastError("Error updating column", e));
    });

    api.on("delete-column", ({ id }) => {
      if (this.tempIdsMap[id]) {
        id = this.tempIdsMap[id];
      }
      deleteColumn({ columnId: id })
        .then(() => {})
        .catch((e) => this.toastError("Error deleting column", e));
    });

    /* ========== CARDS ========== */

    api.on("add-card", ({ card, id }) => {
      createCard({ cardJson: JSON.stringify(card) })
        .then((newId) => {
          this.tempIdsMap[id] = newId;
        })
        .catch((e) => this.toastError("Error creating card", e));
    });

    api.on("update-card", ({ id, card }) => {
      if (this.tempIdsMap[id]) {
        id = this.tempIdsMap[id];
      }
      const plainCard = JSON.parse(JSON.stringify(card));
      const payload = {
        ...plainCard,
        start_date: card.start_date
          ? new Date(card.start_date).toISOString()
          : null,
        end_date: card.end_date ? new Date(card.end_date).toISOString() : null,
        attached: card.attached?.map((att) => ({
          ...att,
          id: att.fileId || att.id
        })),
        id
      };
      updateCard({
        cardId: id,
        cardJson: JSON.stringify(payload)
      }).catch((e) => this.toastError("Error updating card", e));
    });

    api.on("delete-card", ({ id }) => {
      if (this.tempIdsMap[id]) {
        id = this.tempIdsMap[id];
      }
      deleteCard({ cardId: id })
        .then(() => {})
        .catch((e) => this.toastError("Error deleting card", e));
    });

    api.on("move-card", ({ id, columnId, rowId, before }) => {
      if (this.tempIdsMap[id]) {
        id = this.tempIdsMap[id];
      }
      if (this.tempIdsMap[columnId]) {
        columnId = this.tempIdsMap[columnId];
      }
      if (this.tempIdsMap[rowId]) {
        rowId = this.tempIdsMap[rowId];
      }
      if (this.tempIdsMap[before]) {
        before = this.tempIdsMap[before];
      }
      const payload = {
        column: columnId,
        row: rowId,
        id,
        before: before ?? null
      };

      updateCard({
        cardId: id,
        cardJson: JSON.stringify(payload)
      }).catch((e) => this.toastError("Error moving card", e));
    });

    /* =========== ROWS ========== */

    api.on("add-row", ({ row, id }) => {
      createRow({ rowJson: JSON.stringify(row) })
        .then((newId) => {
          this.tempIdsMap[id] = newId;
        })
        .catch((e) => this.toastError("Error creating row", e));
    });

    api.on("update-row", ({ id, row }) => {
      if (this.tempIdsMap[id]) {
        id = this.tempIdsMap[id];
      }
      updateRow({
        rowId: id,
        rowJson: JSON.stringify({ ...row, id })
      }).catch((e) => this.toastError("Error updating row", e));
    });

    api.on("delete-row", ({ id }) => {
      if (this.tempIdsMap[id]) {
        id = this.tempIdsMap[id];
      }
      deleteRow({ rowId: id })
        .then(() => {})
        .catch((e) => this.toastError("Error deleting row", e));
    });

    /* =========== VOTES ========== */

    api.on("add-vote", ({ cardId }) => {
      if (this.tempIdsMap[cardId]) {
        cardId = this.tempIdsMap[cardId];
      }
      addVote({ cardId }).catch((e) => {
        this.toastError("Error adding vote", e);
      });
    });
    api.on("delete-vote", ({ cardId }) => {
      if (this.tempIdsMap[cardId]) {
        cardId = this.tempIdsMap[cardId];
      }
      deleteVote({ cardId }).catch((e) => {
        this.toastError("Error deleting vote", e);
      });
    });

    /* =========== COMMENTS ========== */

    api.on("add-comment", ({ cardId, comment }) => {
      if (this.tempIdsMap[cardId]) {
        cardId = this.tempIdsMap[cardId];
      }
      addComment({ cardId, text: comment.text }).catch((e) => {
        this.toastError("Error adding comment", e);
      });
    });

    api.on("delete-comment", ({ cardId, id }) => {
      if (this.tempIdsMap[cardId]) {
        cardId = this.tempIdsMap[cardId];
      }
      deleteComment({ cardId, commentId: id }).catch((e) => {
        this.toastError("Error deleting comment", e);
      });
    });
    api.on("update-comment", ({ cardId, comment, id }) => {
      if (this.tempIdsMap[cardId]) {
        cardId = this.tempIdsMap[cardId];
      }
      updateComment({
        cardId,
        commentId: id,
        text: comment.text
      }).catch((e) => this.toastError("Error updating comment", e));
    });

    /* =========== LINKS ========== */

    api.on("add-link", ({ id, link }) => {
      const fix = (x) => this.tempIdsMap[x] ?? x;
      const payload = {
        masterId: fix(link.masterId),
        slaveId: fix(link.slaveId),
        relation: link.relation
      };
      createLink({ linkJson: JSON.stringify(payload) })
        .then((newId) => {
          this.tempIdsMap[id] = newId;
        })
        .catch((e) => this.toastError("Error creating link", e));
    });

    api.on("update-link", ({ id, link }) => {
      if (this.tempIdsMap[id]) id = this.tempIdsMap[id];
      updateLink({
        linkId: id,
        linkJson: JSON.stringify({ relation: link.relation })
      }).catch((e) => this.toastError("Error updating link", e));
    });

    api.on("delete-link", ({ id }) => {
      if (this.tempIdsMap[id]) id = this.tempIdsMap[id];
      deleteLink({ linkId: id }).catch((e) =>
        this.toastError("Error deleting link", e)
      );
    });
  }

  toastError(title, error) {
    const message = this.parseApexError(error);
    this.showToast(title, message, "error");
  }

  parseApexError(error) {
    if (!error) return "Unknown error";
    if (Array.isArray(error.body)) {
      return error.body.map((e) => e.message).join(", ");
    } else if (error.body && error.body.message) {
      return error.body.message;
    } else if (error.message) {
      return error.message;
    }
    return "Unknown error";
  }

  showToast(title, message, variant = "info") {
    this.dispatchEvent(
      new ShowToastEvent({
        title,
        message,
        variant
      })
    );
  }
}
