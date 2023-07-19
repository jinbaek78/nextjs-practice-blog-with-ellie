'use client';

import { Category } from './Posts';

type Props = {
  selected: Category;
  onSelected: (selected: Category) => void;
};
export default function Category({ selected, onSelected }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    console.log(target.textContent);
    if (target.textContent === 'Category' || target.textContent!.length > 10) {
      return;
    }

    onSelected(target.textContent as Category);
  };
  const baseStyle = 'hover:text-sky-500';
  const allPostStyle =
    selected === 'All Posts' ? `${baseStyle} text-sky-500` : baseStyle;

  const myStoryStlye =
    selected === 'my story' ? `${baseStyle} text-sky-500` : baseStyle;

  const frontendStyle =
    selected === 'frontend' ? `${baseStyle} text-sky-500` : baseStyle;

  const backendStyle =
    selected === 'backend' ? `${baseStyle} text-sky-500` : baseStyle;

  const javascriptStyle =
    selected === 'javascript' ? `${baseStyle} text-sky-500` : baseStyle;

  return (
    <article onClick={handleClick}>
      <h1 className="mb-2  font-bold text-xl border-b-2 border-b-sky-500">
        Category
      </h1>
      <div className="text-center">
        <h1 className={allPostStyle}>All Posts</h1>
        <h4 className={myStoryStlye}>my story</h4>
        <h4 className={frontendStyle}>frontend</h4>
        <h4 className={backendStyle}>backend</h4>
        <h4 className={javascriptStyle}>javascript</h4>
      </div>
    </article>
  );
}
