import Hero from '@/components/Hero';

export default function AboutPage() {
  return (
    <section className="flex flex-col items-center justify-center">
      <Hero />
      <article className="bg-gray-100 w-full shadow-lg my-7">
        <div className="flex flex-col text-center p-5">
          <h1 className="text-2xl font-bold mb-2">Who AM I?</h1>
          <p className="text-lg ">
            a fullstack developer who loves development
          </p>
          <p className="text-lg">
            {' '}
            {"I'am developing involved human and design"}
          </p>
        </div>
        <div className="flex flex-col text-center p-5">
          <h1 className="text-2xl font-bold mb-2">Carrer</h1>
          <p className="text-lg ">
            a fullstack developer who loves development
          </p>
          <p className="text-lg">
            {' '}
            {"I'am developing involved human and design"}
          </p>
        </div>
        <div className="flex flex-col text-center p-5">
          <h1 className="text-2xl font-bold mb-2">Skills</h1>
          <p className="text-lg ">
            a fullstack developer who loves development
          </p>
          <p className="text-lg">
            {' '}
            {"I'am developing involved human and design"}
          </p>
        </div>
      </article>
    </section>
  );
}
