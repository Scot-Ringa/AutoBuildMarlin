/**
 * Auto Build Marlin
 * abm/js/infoview.js
 *
 * This script runs when the view is created / revealed.
 *
 * The webview already contains the base HTML, so we:
 *  - Set up the initial info webview.
 */
'use strict';

$(function () {

  var verbose = false;
  function log(message, data) {
    if (!verbose) return;
    console.log(`[editview] ${message}`);
    if (data !== undefined) console.dir(data);
  }

  // We need getState, setState, and postMessage.
  const vscode = acquireVsCodeApi();

  // References to elements in the webview.
  const $element = $('#element');

  // Set up the view anew.
  function initInfoView() {
    // Set up the webview with options and basic html.
  }

  // Update state from the stored data structure and filter.
  function saveWebViewState() {
    const data = { data: {} };
    log('saveWebViewState', data);
    vscode.setState(data);
  }

  /**
   * @brief Handle messages sent from the provider with iview.postMessage(msg)
   * @description Handle 'message' events sent directly to the view.
   * @param {object} message - The message object.
   */
  var ignore_update = false;  // Ignore the next update message.
  function handleMessageToUI(message) {
    log("handleMessageToUI", message);
    switch (message.type) {
      // Update the whole form in response to an external change.
      case 'info':
        if (ignore_update) {
          ignore_update = false;
          return;
        }
        //drawInfo(message.data);
        break;

      // Display an error message
      case 'error':
        $('#error').text(message.text).show().click(() => { $('#error').hide(); });
        break;
    }
  }
  window.addEventListener('message', (e) => { handleMessageToUI(e.data); });

  //
  // View was revealed.
  //
  // Webviews are normally torn down when not visible and
  // re-created when they become visible again.
  //

  // Create elements, add handlers, fill in initial info, etc.
  initInfoView();

  //
  // Tab Revealed
  //
  // If there is state data then we can skip the parser and build the form.
  const state = vscode.getState();
  if (state) {
    log("Got VSCode state", state);
    if (state.data !== undefined) {
      log("Init Marlin Info Webview with stored data")
      initInfoView();
    }
  }

});
