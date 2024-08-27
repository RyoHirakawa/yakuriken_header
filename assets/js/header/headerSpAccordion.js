const breakPoint = 1140; //アコーディオンメニューが出てくるブレークポイント
const accordionOpenTimeMs = 120; //アコーディオンメニューが開く時間
const accordionCloseTimeMs = 120; //アコーディオンメニューが閉じる時間

//ボタン単位のアコーディオンクラス(ul要素)
class FooterAccordion {
  static instances = []; //自クラスの配列
  button; //button要素、プラス（マイナス）ボタン
  list; //ul要素、サービスや企業情報の子ページリスト
  isOpen; //リストが開いているかどうか

  // 画面を最適化して、クリックイベント、リサイズイベントを追加
  // instances配列に自クラスを追加
  constructor(id /*アコーディオンを実装したいリストのID*/) {
    this.button = document.querySelector(`button[for="${id}"]`);
    this.list = document.getElementById(`${id}`);
    this.isOpen = false;
    this.optimazeByWindowSize();
    this.button.addEventListener("click", () => this.toggleList());
    window.addEventListener("resize", () => this.optimazeByWindowSize());
    FooterAccordion.instances.push(this);
  }
  //javascriptメディアクエリ、breakpointを使う
  optimazeByWindowSize() {
    if (window.innerWidth > breakPoint) {
      //scrollHeightが子要素の合計heightを越えると、
      //それがscrollHeightの値としてあつかわれてしまうための初期化
      this.list.style.height = 0;
      this.list.style.height = `${this.list.scrollHeight}px`;
    } else {
      this.list.style.height = 0;
      if (this.isOpen) {
        this.list.style.height = `${this.list.scrollHeight}px`;
      }
    }
  }
  //アコーディオンの開閉を切り替え
  toggleList() {
    if (this.isOpen == true) {
      this.closeList(/*animationMs = */ accordionCloseTimeMs);
    } else {
      this.openList(/*animationMs = */ accordionOpenTimeMs);
    }
    this.isOpen = !this.isOpen;
  }
  //アコーディオンメニューを開く
  openList(animationMs /*アニメーションの時間(ms)*/) {
    //自分以外のアコーディオンを閉じる
    FooterAccordion.instances.forEach((instance) => {
      if (instance.isOpen && instance !== this) {
        instance.closeList(accordionCloseTimeMs);
        instance.isOpen = false;
      }
    });
    //必要な情報をセット
    this.list.classList.add("--open");
    this.button.classList.add("--open");
    this.list.style.height = `${0}px`;
    this.list.offsetHeight; //トリガーリフロー
    const fullHeight = this.list.scrollHeight;
    let startTime = null;
    //時間の情報(時刻差)を、合計時間(animationMs)で割って、進捗を管理
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / animationMs, 1);
      this.list.style.height = `${fullHeight * progress}px`;
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.list.style.height = `${fullHeight}px`;
      }
    };
    //DOMHighResTimeStamp型(number)を渡す
    requestAnimationFrame(animate);
  }
  //アコーディオンメニューを閉じる
  closeList(animationMs) {
    //必要な情報をセット
    this.button.classList.remove("--open");
    this.list.style.height = this.list.scrollHeight;
    this.list.offsetHeight; // トリガーリフロー
    const fullHeight = this.list.scrollHeight;
    let startTime = null;
    //時間の情報(時刻差)を、合計時間(animationMs)で割って、進捗を管理
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / animationMs, 1);
      //fullな高さから、進捗に合わせて高さを削っていく
      this.list.style.height = `${fullHeight - fullHeight * progress}px`;
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.list.classList.remove("--open");
        this.list.style.height = `${0}px`; // 最終的な高さに設定
      }
    };
    //DOMHighResTimeStamp型(number)を渡す
    requestAnimationFrame(animate);
  }
}
//メインプロセス
window.addEventListener("DOMContentLoaded", () => {
  modalService = new FooterAccordion("js-modalServiceList");
  modalInformation = new FooterAccordion("js-modalInformationList");
});
