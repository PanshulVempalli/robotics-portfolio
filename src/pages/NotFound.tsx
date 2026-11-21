import { Link } from "react-router-dom";

const NotFound = () => (
  <section className="wrap min-h-[70vh] grid place-items-center text-center">
    <div>
      <p className="label mb-5">Sheet missing</p>
      <h1 className="h-display text-[56px] sm:text-[88px]">Page torn out.</h1>
      <p className="red-pen mt-4 -rotate-2">404 — this page doesn't exist</p>
      <Link to="/" className="btn-ink mt-10">Back to the cover</Link>
    </div>
  </section>
);

export default NotFound;
