"use client";
import { INFOS } from "./constants/appData";

export default function Home() {
  return (
    <div className="home-container">
      {INFOS.map((info) => (
        <div key={info.path}>
          <h2>{info.path}</h2>
          {info.description && <p>{info.description}</p>}
          <a href={info.path} className="a-link">
            {info.title}
          </a>
        </div>
      ))}
    </div>
  );
}
