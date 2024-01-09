class CsdnKiller {
  constructor() {
    this.domMutationObserver = null;
    this.closeLoginPopupCount = 0;
  }

  init() {
    this.onOpenDesignMode('on');
    this.onExpandAllCollapsedCodeBlocks();
    this.onObserverDomMutationAction();
  }

  onOpenDesignMode(mode) {
    document.designMode = mode;
    console.log(
      '%c [ CSDN:KILLER:Congratulations! You can copy every text context now! ]-10',
      'font-size:13px; background:pink; color:#bf2c9f;'
    );
  }

  onExpandAllCollapsedCodeBlocks() {
    const expandBtns = document.querySelectorAll('.hide-preCode-bt');
    expandBtns.forEach((el) => el.click());
    console.log(
      `%c [ CSDN:KILLER:Congratulations! Expand total ${expandBtns.length} code blocks!] ]`,
      'font-size:13px; background:pink; color:#bf2c9f;'
    );
  }

  onObserverDomMutationAction() {
    this.domMutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        this.onCloseLoginPopup(mutation);
      });
    });
    const observerOptions = {
      childList: true, // Observe changes to the child nodes
      subtree: true, // Observe changes in the entire subtree
      attributes: false, // Observe attribute modifications
      attributeOldValue: false, // Record the old value of modified attributes
    };
    this.domMutationObserver.observe(document.body, observerOptions);
  }

  onCloseLoginPopup({ target, addedNodes: [element] }) {
    // login popup id
    if (target.id !== 'passportbox' || element?.tagName !== 'IFRAME') {
      return;
    }
    const closetBtn = target.getElementsByTagName('img');
    closetBtn && closetBtn.length && closetBtn[0].click();
    this.closeLoginPopupCount += 1;
    console.log(
      `%c [ CSDN:KILLER:Congratulations! Kill one login popup, Total: ${this.closeLoginPopupCount} ]`,
      'font-size:13px; background:pink; color:#bf2c9f;'
    );
  }

  destroy() {
    this.domMutationObserver.disconnect();
    this.domMutationObserver = null;
    window.removeEventListener('beforeunload', ext.destroy);
  }
}

const ext = new CsdnKiller();
ext.init();

window.addEventListener('beforeunload', (e) => {
  ext.destroy.call(ext);
});
