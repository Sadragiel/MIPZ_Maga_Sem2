const isInBounds = (value, from, to) => from <= value && value <= to;

const inIntersectedWith = (input, neighborInput) => neighborInput.id !== input.id && (
  (
    isInBounds(neighborInput.xl, input.xl, input.xh)
    && isInBounds(neighborInput.yl, input.yl, input.yh)
  ) || (
    isInBounds(neighborInput.xh, input.xl, input.xh)
    && isInBounds(neighborInput.yh, input.yl, input.yh)
  )
);

const hasCommonBounds = (input, neighborInput) => neighborInput.id !== input.id && (
  (
    (
      +input.xl === +neighborInput.xh + 1
      || +input.xh === +neighborInput.xl - 1
    ) && (
      isInBounds(neighborInput.yl, input.yh, input.yl)
      || isInBounds(neighborInput.yh, input.yh, input.yl)
      || isInBounds(input.yl, neighborInput.yh, neighborInput.yl)
      || isInBounds(input.yh, neighborInput.yh, neighborInput.yl)
    )
  ) || (
    (
      +input.yl === +neighborInput.yh - 1
      || +input.yh === +neighborInput.yl + 1
    ) && (
      isInBounds(neighborInput.xl, input.xl, input.xh)
      || isInBounds(neighborInput.xh, input.xl, input.xh)
      || isInBounds(input.xl, neighborInput.xl, neighborInput.xh)
      || isInBounds(input.xh, neighborInput.xl, neighborInput.xh)
    )
  )
);

export function getValidationErrors(inputs) {
  const errors = new Set();
  const collisions = [];

  inputs.forEach(input => {
    const {
      name,
      xl,
      yl,
      xh,
      yh,
    } = input;
    
    if (!name || xl === '' || yl === '' || xh === '' || yh === '') {
      return; // Editable Inputs should not be validated
    }

    if(inputs.find(({ name, id }) => id !== input.id && name === input.name)) {
      errors.add(`Countries should have unique name. Duplicate Name is ${name}`);
    }

    if (xh < xl || yl < yh) {
      errors.add(`Incorrect coordinates for country ${name}`);
    }

    if (inputs.find(neighborInput => inIntersectedWith(input, neighborInput))) {
      collisions.push(input.name);
    }

    if (!inputs.find(neighborInput => hasCommonBounds(input, neighborInput))) {
      errors.add(`Country ${name} has no common bounds with any othe countries`);
    }
  });

  if (collisions.length) {
    errors.add(`There are some collisions. Countries with intersection: ${collisions.join(', ')}.`)
  }

  return Array.from(errors);
}