import { useEffect, useState } from "react";

export function Async() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isButtonHide, setIsButtonHide] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsButtonVisible(true);
      setIsButtonHide(true);
    }, 100);
  }, []);

  return (
    <div>
      <div>Hello world</div>
      {isButtonVisible && <button>Button</button>}
      {!isButtonHide && <button>Hide</button>}
    </div>
  );
}
