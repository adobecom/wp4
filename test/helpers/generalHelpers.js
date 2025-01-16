import sinon from 'sinon';

export const mockRes = ({ payload, status = 200, ok = true } = {}) => new Promise((resolve) => {
  resolve({
    status,
    ok,
    json: () => payload,
    text: () => payload,
    blob: () => payload,
  });
});

export const mockFetch = (payload) => sinon.stub().callsFake(() => mockRes(payload));
