function printTable(matrix) { //ZZZZ Thx CHATGPT
  const keys = Array.from(new Set(matrix.flatMap(row => row.map(entry => entry.name))));
  console.log("Iterations\t" + keys.join("\t\t"));

  matrix.forEach((row, index) => {
    const rowValues = keys.map(key => {
      const entry = row.find(entry => entry.name === key);
      return entry ? entry.value.toFixed(6) : '';
    });
    console.log(index  + "\t\t" + rowValues.join("\t"));
  });
}

class Connection {
  constructor(origin, destination) {
    this.origin = origin;
    this.destination = destination;
  }
}

class Node {
  constructor(name) {
    this.name = name;
    this.incomingConnections = [];
    this.outgoingConnections = [];
  }
}

class Graph {
  constructor(nodes, connections){
    this.nodes = nodes;
    this.connections = connections;
    this.assignConnections = () => {
      this.nodes.forEach((node) => {
        this.connections.forEach((con) => {
          if (node.name === con.origin) {
            node.outgoingConnections.push(con);
          } else if (node.name === con.destination) {
            node.incomingConnections.push(con);
          }
        });
      });
    };
    
    this.printGraph = () =>{
      this.nodes.forEach((node) => {
        console.log(node.outgoingConnections)
        console.log(node.incomingConnections)
        console.log(`--------------NODE: ${node.name}------------------------`);
        node.outgoingConnections.forEach((con) => {
          console.log(con.origin + " -> " + con.destination)
        })
        node.incomingConnections.forEach((con) => {
          console.log(con.destination + " -> " + con.origin)
        })
      });
    }
    this.pageRank = (nIt) => {
      const porcentajeInicial = 1 / this.nodes.length;
      const pageRank = [];
      let firstRank = [];

      this.nodes.forEach((node) => {
        firstRank.push({ name: node.name, value: porcentajeInicial });
      });

      pageRank.push([...firstRank]); // Clone the array to avoid modifying it later

      for (let i = 0; i < nIt; i++) {
        console.log("Iteration: " + i);

        let currentIt = [];
        for (const node of this.nodes) {
          let itValue = 0;

          for (const n of node.incomingConnections) {
            const oV = pageRank[pageRank.length - 1].find((e) => e.name === n.origin);
            const nV = oV.value / this.nodes.find((item) => item.name === n.origin).outgoingConnections.length;

            itValue += nV;
          }

          currentIt.push({ name: node.name, value: itValue });
        }

        pageRank.push([...currentIt]); // Clone the array to avoid modifying it later
      }
      printTable(pageRank)
      /* console.log(JSON.stringify(pageRank, null, 2)); */
    };
  }
}



const nodes = []
const connections = []
nodes.push(new Node("a"))
nodes.push(new Node("b"))
nodes.push(new Node("c"))
connections.push(new Connection("a","b"))
connections.push(new Connection("b","c"))
connections.push(new Connection("c","b"))
connections.push(new Connection("c","a"))


const totalGraph = new Graph(nodes, connections);
totalGraph.assignConnections()
//totalGraph.printGraph()
totalGraph.pageRank(3)

