import toast, { Toaster } from "react-hot-toast";
import Layout from "@/components/layout/Layout";
const notify = () => toast("Here is your toast.");

const App = () => {
  return (
    <>
      <button onClick={notify}>Make me a toast</button>
      {/* <Toaster /> */}
    </>
  );
};
export default App;
