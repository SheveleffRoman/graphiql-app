import * as React from 'react';
import { Link } from 'react-router-dom';

export interface IAppProps {}

export default function GraphiqlIDE() {
  return (
    <div>
      <h1>Graphiql IDE</h1>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </div>
  );
}
