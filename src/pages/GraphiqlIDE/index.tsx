import * as React from 'react';
import { Link } from 'react-router-dom';

export interface IAppProps {}

export default function GraphiqlIDE() {
  return (
    <>
      <h1>GraphiQl IDE</h1>
      <Link to="/">Home</Link>
    </>
  );
}
