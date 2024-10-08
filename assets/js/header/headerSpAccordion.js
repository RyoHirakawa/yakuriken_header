const breakPoint = 1140;
const accordionOpenTimeMs = 120;
const accordionCloseTimeMs = 120;
class FooterAccordion {
  static instances = [];
  label;
  list;
  isActive;
  constructor(id) {
    this.label = document.querySelector(`label[for="${id}"]`);
    this.list = document.getElementById(`${id}`);
    this.isActive = false;
    this.optimazeByWindowSize();
    this.label.addEventListener("click", () => this.toggleList());
    window.addEventListener("resize", () => this.optimazeByWindowSize());
    FooterAccordion.instances.push(this);
  }
  optimazeByWindowSize() {
    if (window.innerWidth > breakPoint) {
      this.list.style.height = 0;
      this.list.style.height = `${this.list.scrollHeight}px`;
    } else {
      this.list.style.height = 0;
      if (this.isActive) {
        this.list.style.height = `${this.list.scrollHeight}px`;
      }
    }
  }
  toggleList() {
    if (this.isActive == true) {
      this.closeList(accordionCloseTimeMs);
    } else {
      this.openList(accordionOpenTimeMs);
    }
    this.isActive = !this.isActive;
  }
  openList(animationMs) {
    FooterAccordion.instances.forEach((instance) => {
      if (instance.isActive && instance !== this) {
        instance.closeList(accordionCloseTimeMs);
        instance.isActive = false;
      }
    });
    this.list.classList.add("-open");
    this.label.classList.add("-open");
    this.list.style.height = `${0}px`;
    this.list.offsetHeight; //トリガーリフロー
    const fullHeight = this.list.scrollHeight;
    let startTime = null;
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
    requestAnimationFrame(animate);
  }
  closeList(animationMs) {
    this.label.classList.remove("-open");
    this.list.style.height = this.list.scrollHeight;
    this.list.offsetHeight; // トリガーリフロー
    const fullHeight = this.list.scrollHeight;
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / animationMs, 1); // 0から1の範囲
      this.list.style.height = `${fullHeight - fullHeight * progress}px`;
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.list.classList.remove("-open");
        this.list.style.height = `${0}px`; // 最終的な高さに設定
      }
    };
    requestAnimationFrame(animate);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  modalService = new FooterAccordion("js-modalServiceList");
  modalInformation = new FooterAccordion("js-modalInformationList");
});
