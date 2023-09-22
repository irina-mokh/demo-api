import { IComment } from 'shared/utils/types';

export const Comment = ({ email, body, name }: IComment) => {
  return (
    <li className="comment bg-gray-700 bg-opacity-20 p-2 rounded-md my-1">
      <p className="text-md text-teal-600">{email}</p>

      {/* name of comment instead of user name, coz api doesn't give user by email in comment */}
      <p className="my-1 text-base">{name}</p>
      <p className="text-gray-300">{body}</p>
    </li>
  );
};
