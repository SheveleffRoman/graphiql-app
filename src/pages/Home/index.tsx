import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Home GraphiQL</h1>

      <nav>
        <Link to="graphiql">GraphiQL IDE</Link>
      </nav>
    </div>
  );
}
