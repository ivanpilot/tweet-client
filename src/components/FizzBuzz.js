for (let i = 1; i < 101; i++){
  switch (true) {
    case (i % 3 === 0 && i % 5 === 0):
      console.log('FizzBuzz')
      break
    case (i % 3 === 0):
      console.log('Fiz')
      break
    case (i % 5 === 0):
      console.log('Buzz')
      break
    default:
      console.log(i)
      break
  }
}


// for (let i = 1; i < 101; i++){
//   switch (i) {
//     case (i === 1 ):
//       console.log('FizzBuzz')
//     case (i  === 2):
//       console.log('Fiz')
//     case (i === 3):
//       console.log('Buzz')
//     default:
//       console.log(i)
//   }
// }
