function setSlide(index: number) {
  if (index >= slides_css.length || index < 0) {
    return;
  }

  const iframe = document.getElementById("container") as HTMLIFrameElement;
  const preview = (iframe.contentDocument ||
    iframe.contentWindow?.document) as Document;

  for (var i = 0; i < slides_css.length; i++) {
    const slide = preview.getElementById("slideNum-" + i);
    slide?.parentNode?.removeChild(slide);
  }

  for (var i = 0; i <= index; i++) {
    const style = preview.createElement("style");
    style.setAttribute("id", "slideNum-" + i);
    style.innerHTML = slides_css[i].css;

    preview.body.appendChild(style);
  }
}

function left() {
  setSlide(activeSlide - 1);
  selectSlide(activeSlide - 1);
}

function right() {
  setSlide(activeSlide + 1);
  selectSlide(activeSlide + 1);
}
