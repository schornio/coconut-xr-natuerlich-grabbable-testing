"use client";

export default function Home() {
  return (
    <div className="home-container">
      <h2>/basic</h2>
      <p>Description</p>
      <a href="/basic" className="a-link">
        Basic
      </a>

      <h2>/basic-with-group</h2>
      <a href="/basic-with-group" className="a-link">
        Basic with group
      </a>

      <h2>/grabbable</h2>
      <a href="/grabbable" className="a-link">
        Grababble
      </a>

      <h2>/grababble-with-group</h2>
      <a href="/grabbable-with-group" className="a-link">
        Grabbable with group
      </a>
    </div>
  );
}
