import Ollama from "ollama";

const ollama = new Ollama({
    baseUrl: "http://localhost:11434",
});

async function runOllama() {
    const response = await ollama.call('deepseek-r1:1.5b', { input: 'Hello, Ollama!' });
    console.log(response);
  }

runOllama();
