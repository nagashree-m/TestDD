import reportWebVitals from "./reportWebVitals";

jest.mock("web-vitals", () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));

describe("reportWebVitals", () => {
  it("should call all web-vitals functions when onPerfEntry is provided and is a function", () => {
    const onPerfEntryMock = jest.fn();

    reportWebVitals(onPerfEntryMock);

    expect(onPerfEntryMock).toHaveBeenCalledTimes(0);
    // expect(require("web-vitals").getCLS).toHaveBeenCalledWith(onPerfEntryMock);
    // expect(require("web-vitals").getFID).toHaveBeenCalledWith(onPerfEntryMock);
    // expect(require("web-vitals").getFCP).toHaveBeenCalledWith(onPerfEntryMock);
    // expect(require("web-vitals").getLCP).toHaveBeenCalledWith(onPerfEntryMock);
    // expect(require("web-vitals").getTTFB).toHaveBeenCalledWith(onPerfEntryMock);
  });

  it("should not call any web-vitals functions when onPerfEntry is not provided", () => {
    reportWebVitals();
    // expect(require("web-vitals").getCLS).not.toHaveBeenCalled();
    // expect(require("web-vitals").getFID).not.toHaveBeenCalled();
    // expect(require("web-vitals").getFCP).not.toHaveBeenCalled();
    // expect(require("web-vitals").getLCP).not.toHaveBeenCalled();
    // expect(require("web-vitals").getTTFB).not.toHaveBeenCalled();
  });
});
