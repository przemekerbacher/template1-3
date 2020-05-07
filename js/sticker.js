const sticker = ({ el1, el2, offset, container }) => {
  const $container = $(container);

  $container.scroll(() => {
    const $el1 = $(el1);
    const $el2 = $(el2);
    const el1Height = $el1.height();
    const el2Height = $el2.height();
    if (el1Height > el2Height) {
      const currentScroll = $container.scrollTop() + offset;

      const elementIsOnScreen = (element) => {
        if (currentScroll >= element.offset().top) {
          return true;
        }
      };

      const elementIsOnBotomOfWindow = () => {
        const el1Offset = $el1.offset().top;
        const el2Posiition = el1Offset + el1Height - el2Height;
        if (currentScroll >= el2Posiition) {
          return true;
        } else {
          return false;
        }
      };

      const stickElementOnposition = (element, position) => {
        element.css({
          position: "relative",
          top: `${position}px`,
        });
      };

      const stickElement = (element) => {
        const el1Offset = $el1.offset().top;
        const position = currentScroll - el1Offset;

        stickElementOnposition(element, position);
      };

      const unstickElement = (element) => {
        element.css({
          position: "static",
          top: `0`,
        });
      };

      if (elementIsOnScreen($el1) && !elementIsOnBotomOfWindow()) {
        stickElement($el2);
      }

      if (currentScroll < $el1.offset().top) {
        unstickElement($el2);
      }
    }
  });
};
