interface IEditColor {
  isDeleted: boolean;
}

interface IColor {
  code: string
  name: string
  image: File
}

export const checkInvalidEdit = (
  category: string,
  color: IEditColor[],
  name: string,
  description: string,
  price: number,
  setInvalidCategory: (value: boolean) => void,
  setInvalidColor: (value: boolean) => void,
  setInvalidMainImage: (value: boolean) => void,
  setNameErrorMessage: (value: string) => void,
  setDescErrorMessage: (value: string) => void,
  setPriceErrorMessage: (value: string) => void
): boolean => {
  let isInvalidCategory = false;
  let isInvalidColor = false;
  let isInvalidMainImage = false;
  let nameErrorMessage = '';
  let descErrorMessage = '';
  let priceErrorMessage = '';

  if (!category) {
    isInvalidCategory = true;
  }

  if (color.every((item: IEditColor) => item.isDeleted === true)) {
    isInvalidColor = true;
  }

  if (name.length === 0) {
    nameErrorMessage = 'Name must be at least 2 characters.';
  }

  if (description.length === 0) {
    descErrorMessage = 'Description must be at least 15 characters.';
  }

  if (isNaN(price) || price < 1000) {
    priceErrorMessage = 'Price cannot be lower than Rp1.000.';
  }

  // Update state
  setInvalidCategory(isInvalidCategory);
  setInvalidColor(isInvalidColor);
  setInvalidMainImage(isInvalidMainImage);
  setNameErrorMessage(nameErrorMessage);
  setDescErrorMessage(descErrorMessage);
  setPriceErrorMessage(priceErrorMessage);

  // Return combined validation result
  return (
    isInvalidCategory ||
    isInvalidColor ||
    isInvalidMainImage ||
    !!nameErrorMessage ||
    !!descErrorMessage ||
    !!priceErrorMessage
  );
}

export const checkInvalidCreate = (
  category: string,
  color: IColor[],
  thumbnail: File | undefined,
  name: string,
  description: string,
  price: number,
  setInvalidCategory: (value: boolean) => void,
  setInvalidColor: (value: boolean) => void,
  setInvalidMainImage: (value: boolean) => void,
  setNameErrorMessage: (value: string) => void,
  setDescErrorMessage: (value: string) => void,
  setPriceErrorMessage: (value: string) => void
): boolean => {
  let isInvalidCategory = false;
  let isInvalidColor = false;
  let isInvalidMainImage = false;
  let nameErrorMessage = '';
  let descErrorMessage = '';
  let priceErrorMessage = '';

  if (!category) {
    isInvalidCategory = true;
  }

  if (color.length === 0) {
    isInvalidColor = true;
  }

  if (!thumbnail) {
    isInvalidMainImage = true;
  }

  if (name.length === 0) {
    nameErrorMessage = 'Name must be at least 2 characters.';
  }

  if (description.length === 0) {
    descErrorMessage = 'Description must be at least 15 characters.';
  }

  if (isNaN(price) || price < 1000) {
    priceErrorMessage = 'Price cannot be lower than Rp1.000.';
  }

  setInvalidCategory(isInvalidCategory);
  setInvalidColor(isInvalidColor);
  setInvalidMainImage(isInvalidMainImage);
  setNameErrorMessage(nameErrorMessage);
  setDescErrorMessage(descErrorMessage);
  setPriceErrorMessage(priceErrorMessage);

  return (
    isInvalidCategory ||
    isInvalidColor ||
    isInvalidMainImage ||
    nameErrorMessage !== '' ||
    descErrorMessage !== '' ||
    priceErrorMessage !== ''
  );
};
