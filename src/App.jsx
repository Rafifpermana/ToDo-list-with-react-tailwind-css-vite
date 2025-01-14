import Todo from "./components/Todo";

const App = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
      }}
    >
      <Todo />
    </div>
  );
};

export default App;
