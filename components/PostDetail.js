import React from 'react';
import moment from 'moment';

const PostDetail = ({ post }) => {
  console.log(post.content.raw);

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
      if (obj.href) {
        if (obj.children[0].text !== '') {
          modifiedText = (
            <a href={obj.href} className="text-blue-500 underline">
              {obj.children[0].bold ? <b>{obj.children[0].text}</b> : obj.children[0].text}
            </a>
          );
        } else {
          modifiedText = (
            <a href={obj.href}>
              <img src={obj.href} alt="sa" className="text-blue-500 underline" />
            </a>
          );
        }
      }
      if (obj.code) {
        modifiedText = (
          <code key={index} className="border rounded-md bg-gray-100 border-gray-200 px-1">
            {text}
          </code>
        );
      }
    }

    switch (type) {
      case 'heading-two':
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case 'heading-three':
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case 'paragraph':
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => {
              return <React.Fragment key={i}>{item}</React.Fragment>;
            })}
          </p>
        );
      case 'heading-four':
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case 'code-block':
        return (
          <pre
            className="border rounded-lg p-4 mb-4 bg-slate-400 text-white overflow-x-auto"
            key={index}
          >
            <code className="text-md mb-4">
              {modifiedText.map((item, i) => {
                return <React.Fragment key={i}>{item}</React.Fragment>;
              })}
            </code>
          </pre>
        );
      case 'image':
        return (
          <img key={index} alt={obj.title} height={obj.height} width={obj.width} src={obj.src} />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-20 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top h-full w-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            <img
              src={post.author.photo.url}
              alt={post.author.name}
              className="align-middle rounded-full w-[30px] h-[30px]"
            />
            <p className="inline align-middle text-gray-700 ml-2 text-lg tracking-wide">
              {post.author.name}
            </p>
          </div>
          <div className="font-medium text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
          </div>
        </div>
      </div>
      <h1 className="mb-8 text-3xl font-semibold text-center">{post.title}</h1>
      {post.content.raw.children.map((typeObj, index) => {
        const children = typeObj.children.map((item, itemIndex) =>
          getContentFragment(itemIndex, item.text, item)
        );
        return getContentFragment(index, children, typeObj, typeObj.type);
      })}
    </div>
  );
};

export default PostDetail;
