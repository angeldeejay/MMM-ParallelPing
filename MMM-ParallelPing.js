/**
 * @file MMM-ParallelPing.js
 *
 * @author angeldeejay
 * @license MIT
 *
 * @see https://github.com/angeldeejay/MMM-ParallelPing
 */

/* global Module Log */

/**
 * @external Module
 * @see https://github.com/MichMich/MagicMirror/blob/master/js/module.js
 */

/**
 * @external Log
 * @see https://github.com/MichMich/MagicMirror/blob/master/js/logger.js
 */

/**
 * @module MMM-ParallelPing
 * @description Frontend for the module to display data.
 *
 * @requires external:Module
 * @requires external:Log
 */
Module.register("MMM-ParallelPing", {
    /** @member {Object} status - List of results with hosts and their online status. */
    status: [],

    /** @member {Object} onlineMapping - Map online states to strings. */
    onlineMapping: {
        true: "online",
        false: "offline",
    },

    /**
     * @member {Object} defaults - Defines the default config values.
     * @property {boolean} colored - Flag to render map in color or greyscale.
     * @property {string} display - Online states which should be displayed.
     * @property {Object[]} hosts - List of hosts to ping.
     * @property {int} updateInterval - Speed of update.
     * @property {int} timeout - Ping timeout.
     * @property {string} font - Class name for font size.
     * @property {number} transitionTime - Time the transition for a new update in the DOM should take.
     */
    defaults: {
        colored: false,
        display: "both",
        hosts: [],
        updateInterval: 5,
        timeout: 2,
        font: "medium",
        transitionTime: 300,
    },

    /**
     * @function getTranslations
     * @description Translations for this module.
     * @override
     *
     * @returns {Object.<string, string>} Available translations for this module (key: language code, value: filepath).
     */
    getTranslations() {
        return {
            en: "translations/en.json",
            de: "translations/de.json",
            es: "translations/es.json",
        };
    },

    /**
     * @function getStyles
     * @description Style dependencies for this module.
     * @override
     *
     * @returns {string[]} List of the style dependency filepaths.
     */
    getStyles() {
        return ["MMM-ParallelPing.css"];
    },

    /**
     * @function getTemplate
     * @description Nunjuck template.
     * @override
     *
     * @returns {string} Path to nunjuck template.
     */
    getTemplate() {
        return "templates/MMM-ParallelPing.njk";
    },

    /**
     * @function getTemplateData
     * @description Data that gets rendered in the nunjuck template.
     * @override
     *
     * @returns {object} Data for the nunjuck template.
     */
    getTemplateData() {
        const status = this.status.filter(
            (entry) =>
                this.config.display === "both" ||
                this.config.display === this.onlineMapping[entry.online]
        );

        return {
            config: this.config,
            status,
        };
    },

    /**
     * @function start
     * @description Initiates ping interval.
     * @override
     *
     * @returns {void}
     */
    start() {
        Log.info(`Starting module: ${this.name}`);
        setInterval(() => this.checkHosts(), ths.config.updateInterval * 1000);
    },

    /**
     * @function checkHosts
     * @description Sends a notification to node_helper to ping hosts again.
     * @override
     *
     * @returns {void}
     */
    checkHosts() {
        this.fixHosts();
        this.sendSocketNotification("CHECK_HOSTS", this.config.hosts);
    },

    /**
     * @function socketNotificationReceived
     * @description Handles incoming messages from node_helper.
     * @override
     *
     * @param {string} notification - Notification name
     * @param {*} payload - Detailed payload of the notification.
     */
    socketNotificationReceived(notification, payload) {
        if (notification === "STATUS_UPDATE") {
            this.status = payload;
            this.updateDom(this.config.transitionTime);
        }
    },

    /**
     * @function notificationReceived
     * @description Handles incoming broadcasts from other modules or the MagicMirror core.
     * @override
     *
     * @param {string} notification - Notification name
     * @param {*} payload - Detailed payload of the notification.
     * @param {MM} [sender] - The sender of the notification. If sender is undefined the sender is the core.
     */
    notificationReceived(notification, payload, sender) {
        if (notification === "ALL_MODULES_STARTED") {
            this.checkHosts();
        }
    },

    /**
     * @function fixHosts
     * @description Fix hosts config to allow using labels on them.
     *
     * @returns {void}
     */
    fixHosts() {
        this.config.hosts = this.config.hosts.map((h) =>
            typeof h === "string"
                ? {
                    host: h,
                    label: h,
                    timeout: this.config.timeout,
                    updateInterval: this.config.updateInterval,
                }
                : {
                    ...h,
                    timeout: this.config.timeout,
                    updateInterval: this.config.updateInterval,
                }
        );
    },
});
