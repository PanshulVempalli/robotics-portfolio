import { Link } from "react-router-dom";

const NotFound = () => (
  <section className="min-h-[80vh] grid place-items-center text-center px-6 pt-24">
    <div>
      <p className="eyebrow mb-6">404 · Off the field</p>
      <h1 className="display text-[56px] sm:text-[88px]"><span className="dim-text">This path </span><span className="grad-text">isn't mapped.</span></h1>
      <p className="lede mt-6">The page you were looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary mt-10">Back home</Link>
    </div>
  </section>
);

export default NotFound;
