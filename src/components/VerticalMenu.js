import React from 'react';
// import MessageInput from './MessageInput';
import AddTweetInput from './AddTweetInput';
import '../styles/VerticalMenu.css';

export const VerticalMenu = (props) => (
  <div className='vertical-menu'>
    <div className='ui header item center aligned'>
      Tweet
    </div>
    <AddTweetInput />
  </div>
)

// class VerticalMenu extends React.Component {
//   render(){
//     return(
//       <div className='vertical-menu'>
//         <div className='ui header item center aligned'>
//           Tweet
//         </div>
//         <AddTweetInput
//         />
//       </div>
//     )
//   }
// }
//
// export default VerticalMenu
