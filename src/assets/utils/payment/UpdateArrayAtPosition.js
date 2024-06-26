export const UpdateArrayAtPosition = (Arr, position, value) => {
  if (Arr.length <= position) {
    for (let i = Arr.length; i < position; i++) {
      Arr.push(null);
    }
    Arr[position] = value;
  } else {
    Arr[position] = value;
  }

  return Arr;
};
