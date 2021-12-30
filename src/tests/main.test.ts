import pluginDate from '../main';

describe('plugin date', () => {
  test('should be able to handle invalid configuration', async () => {
    console.error = jest.fn();

    expect(
      pluginDate(() => ({
        format: 'dd/MM/yyyy',
        // @ts-ignore
      }))(123, {})
    ).toBeFalsy();

    expect(console.error).toHaveBeenCalled();
    // @ts-ignore
    console.error.mockReset();

    expect(
      pluginDate(() => ({
        // @ts-ignore
        format: 12,
      }))('2021-10-05', {})
    ).toBeFalsy();

    expect(console.error).toHaveBeenCalled();
    // @ts-ignore
    console.error.mockReset();

    expect(
      pluginDate(() => ({
        format: 'dd/MM/yyyy',
        isBefore: '2021-10-06',
      }))('2021-10-05', {})
    ).toBeFalsy();

    expect(console.error).toHaveBeenCalled();
    // @ts-ignore
    console.error.mockReset();

    expect(
      pluginDate(() => ({
        format: 'dd/MM/yyyy',
        isBefore: '06/10/2021',
      }))('2021-10-05', {})
    ).toBeFalsy();

    expect(console.error).toHaveBeenCalled();
    // @ts-ignore
    console.error.mockReset();

    expect(
      pluginDate(() => ({
        format: 'dd/MM/yyyy',
        isAfter: '2021-10-06',
      }))('2021-10-05', {})
    ).toBeFalsy();

    expect(console.error).toHaveBeenCalled();
    // @ts-ignore
    console.error.mockReset();

    expect(
      pluginDate(() => ({
        format: 'dd/MM/yyyy',
        isAfter: '2021-10-06',
        isBefore: '2021-10-07',
        // @ts-ignore
      }))(123, {})
    ).toBeFalsy();

    expect(console.error).toHaveBeenCalled();
    // @ts-ignore
    console.error.mockReset();

    expect(() => {
      pluginDate(() => ({
        format: 'zzzxc',
      }))('2021-10-05', {});
    }).toThrow();
  });

  test('should be able to validate format matching', async () => {
    expect(
      pluginDate(() => ({
        format: 'dd/MM/yyyy',
      }))('10/12/2021', {})
    ).toBeTruthy();
    expect(
      pluginDate(() => ({
        format: 'dd/MM/yyyy',
      }))('01/12/2021', {})
    ).toBeTruthy();

    expect(
      pluginDate(() => ({
        format: 'd MMM yy',
      }))('1 Dec 21', {})
    ).toBeTruthy();

    expect(
      pluginDate(() => ({
        format: 'd MMM yy',
      }))('1 Dec 2021', {})
    ).toBeFalsy();

    expect(
      pluginDate(() => ({
        format: 'd MMM yy',
      }))('01/12/2021', {})
    ).toBeFalsy();
  });

  test('should be able to validate isBefore', async () => {
    const elem = document.createElement('input');
    elem.setAttribute('type', 'text');
    elem.setAttribute('id', 'date_start');
    elem.setAttribute('value', '11/12/2021');

    expect(
      pluginDate((fields) => ({
        format: 'dd/MM/yyyy',
        isBefore: fields['#date_start'].elem.value,
      }))('10/12/2021', {
        '#date_start': {
          elem,
          rules: [],
        },
      })
    ).toBeTruthy();

    expect(
      pluginDate((fields) => ({
        format: 'dd/MM/yyyy',
        isBefore: fields['#date_start'].elem.value,
      }))('10/11/2021', {
        '#date_start': {
          elem,
          rules: [],
        },
      })
    ).toBeTruthy();

    expect(
      pluginDate((fields) => ({
        format: 'dd/MM/yyyy',
        isBefore: fields['#date_start'].elem.value,
      }))('10/12/2020', {
        '#date_start': {
          elem,
          rules: [],
        },
      })
    ).toBeTruthy();

    expect(
      pluginDate((fields) => ({
        format: 'dd/MM/yyyy',
        isBefore: fields['#date_start'].elem.value,
      }))('12/12/2021', {
        '#date_start': {
          elem,
          rules: [],
        },
      })
    ).toBeFalsy();

    expect(
      pluginDate((fields) => ({
        format: 'dd/MM/yyyy',
        isBefore: fields['#date_start'].elem.value,
      }))('01/01/2022', {
        '#date_start': {
          elem,
          rules: [],
        },
      })
    ).toBeFalsy();

    expect(
      pluginDate((fields) => ({
        format: 'dd/MM/yyyy',
        isBefore: fields['#date_start'].elem.value,
      }))('11/12/2021', {
        '#date_start': {
          elem,
          rules: [],
        },
      })
    ).toBeFalsy();
  });

  test('should be able to validate isAfter', async () => {
    const elem = document.createElement('input');
    elem.setAttribute('type', 'text');
    elem.setAttribute('id', 'date_start');
    elem.setAttribute('value', '11/12/2021');

    expect(
      pluginDate((fields) => ({
        format: 'dd/MM/yyyy',
        isAfter: fields['#date_start'].elem.value,
      }))('10/12/2021', {
        '#date_start': {
          elem,
          rules: [],
        },
      })
    ).toBeFalsy();

    expect(
      pluginDate((fields) => ({
        format: 'dd/MM/yyyy',
        isAfter: fields['#date_start'].elem.value,
      }))('10/11/2021', {
        '#date_start': {
          elem,
          rules: [],
        },
      })
    ).toBeFalsy();

    expect(
      pluginDate((fields) => ({
        format: 'dd/MM/yyyy',
        isAfter: fields['#date_start'].elem.value,
      }))('10/12/2020', {
        '#date_start': {
          elem,
          rules: [],
        },
      })
    ).toBeFalsy();

    expect(
      pluginDate((fields) => ({
        format: 'dd/MM/yyyy',
        isAfter: fields['#date_start'].elem.value,
      }))('12/12/2021', {
        '#date_start': {
          elem,
          rules: [],
        },
      })
    ).toBeTruthy();

    expect(
      pluginDate((fields) => ({
        format: 'dd/MM/yyyy',
        isAfter: fields['#date_start'].elem.value,
      }))('01/01/2022', {
        '#date_start': {
          elem,
          rules: [],
        },
      })
    ).toBeTruthy();

    expect(
      pluginDate((fields) => ({
        format: 'dd/MM/yyyy',
        isAfter: fields['#date_start'].elem.value,
      }))('11/12/2021', {
        '#date_start': {
          elem,
          rules: [],
        },
      })
    ).toBeFalsy();
  });

  test('should be able to validate isBefore and isAfter with different format', async () => {
    const elem = document.createElement('input');

    expect(
      pluginDate(() => ({
        format: 'dd MMM yyyy',
        isAfter: '09 Dec 2021',
        isBefore: '11 Dec 2021',
      }))('10 Dec 2021', {
        '#date_start': {
          elem,
          rules: [],
        },
      })
    ).toBeTruthy();

    expect(
      pluginDate(() => ({
        format: 'dd.MM.yy',
        isAfter: '01.01.20',
        isBefore: '01.01.21',
      }))('10.05.20', {
        '#date_start': {
          elem,
          rules: [],
        },
      })
    ).toBeTruthy();

    expect(
      pluginDate(() => ({
        format: 'dd.MM.yy',
        isAfter: '01.01.20',
        isBefore: '01.01.21',
      }))('10.05.20', {
        '#date_start': {
          elem,
          rules: [],
        },
      })
    ).toBeTruthy();

    expect(
      pluginDate(() => ({
        format: 'yyyy-MM-dd',
        isAfter: '2021-12-05',
        isBefore: '2021-12-07',
      }))('2021-12-06', {
        '#date_start': {
          elem,
          rules: [],
        },
      })
    ).toBeTruthy();

    expect(
      pluginDate(() => ({
        format: 'yyyy-MM-dd',
        isAfter: '2021-12-05',
        isBefore: '2021-12-07',
      }))('2021-12-08', {
        '#date_start': {
          elem,
          rules: [],
        },
      })
    ).toBeFalsy();

    expect(
      pluginDate(() => ({
        format: 'yyyy-MM-dd',
        isAfter: new Date('2021-12-05'),
        isBefore: new Date('2021-12-07'),
      }))('2021-12-08', {
        '#date_start': {
          elem,
          rules: [],
        },
      })
    ).toBeFalsy();
  });

  test('should be able to validate isBefore and isAfter using Date input', async () => {
    const dateBefore = document.createElement('input');
    dateBefore.setAttribute('type', 'date');
    dateBefore.setAttribute('id', 'date_before');
    dateBefore.setAttribute('value', '2021-12-20');

    const dateAfter = document.createElement('input');
    dateAfter.setAttribute('type', 'date');
    dateAfter.setAttribute('id', 'date_after');
    dateAfter.setAttribute('value', '2021-12-18');

    expect(
      pluginDate((fields) => ({
        isAfter: fields['#date_after'].elem.value,
        isBefore: fields['#date_before'].elem.value,
      }))('2021-12-19', {
        '#date_before': {
          elem: dateBefore,
          rules: [],
        },
        '#date_after': {
          elem: dateAfter,
          rules: [],
        },
      })
    ).toBeTruthy();

    expect(
      pluginDate((fields) => ({
        isAfter: fields['#date_after'].elem.value,
        isBefore: fields['#date_before'].elem.value,
      }))('2021-12-20', {
        '#date_before': {
          elem: dateBefore,
          rules: [],
        },
        '#date_after': {
          elem: dateAfter,
          rules: [],
        },
      })
    ).toBeFalsy();

    expect(
      pluginDate((fields) => ({
        isAfter: fields['#date_after'].elem.value,
        isBefore: fields['#date_before'].elem.value,
      }))('2021-12-21', {
        '#date_before': {
          elem: dateBefore,
          rules: [],
        },
        '#date_after': {
          elem: dateAfter,
          rules: [],
        },
      })
    ).toBeFalsy();
  });
});
