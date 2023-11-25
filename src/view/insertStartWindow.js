import StartWindow from "./startView";

export default function insertStartWindow(handleStartGame) {
  const startWindow = new StartWindow(handleStartGame);
  startWindow.insertStartWindow();
}
