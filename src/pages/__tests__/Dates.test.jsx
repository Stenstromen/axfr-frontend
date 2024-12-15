import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { DefaultProvider } from "../../contexts/default";
import Dates from "../Dates";

// Mock axios
vi.mock("axios");

// Mock data with unique IDs
const mockDatesData = [
  {
    date: 20241214,
    amount: 19,
  },
  {
    date: 20241213,
    amount: 52,
  },
  {
    date: 20241212,
    amount: 65,
  },
  {
    date: 20241211,
    amount: 82,
  },
  {
    date: 20241210,
    amount: 66,
  },
  {
    date: 20241209,
    amount: 60,
  },
  {
    date: 20241208,
    amount: 33,
  },
  {
    date: 20241207,
    amount: 23,
  },
  {
    date: 20241206,
    amount: 58,
  },
  {
    date: 20241205,
    amount: 52,
  },
  {
    date: 20241204,
    amount: 56,
  },
  {
    date: 20241203,
    amount: 62,
  },
  {
    date: 20241202,
    amount: 65,
  },
  {
    date: 20241201,
    amount: 44,
  },
  {
    date: 20241130,
    amount: 22,
  },
  {
    date: 20241129,
    amount: 52,
  },
  {
    date: 20241128,
    amount: 104,
  },
  {
    date: 20241127,
    amount: 72,
  },
  {
    date: 20241126,
    amount: 126,
  },
  {
    date: 20241125,
    amount: 90,
  },
  {
    "date": 20241124,
    "amount": 39
  },
  {
    "date": 20241123,
    "amount": 30
  },
  {
    "date": 20241122,
    "amount": 45
  },
  {
    "date": 20241121,
    "amount": 61
  },
  {
    "date": 20241120,
    "amount": 81
  },
  {
    "date": 20241119,
    "amount": 54
  },
  {
    "date": 20241118,
    "amount": 84
  },
  {
    "date": 20241117,
    "amount": 23
  },
  {
    "date": 20241116,
    "amount": 21
  },
  {
    "date": 20241115,
    "amount": 68
  },
  {
    "date": 20241114,
    "amount": 95
  },
  {
    "date": 20241113,
    "amount": 47
  },
  {
    "date": 20241112,
    "amount": 67
  },
  {
    "date": 20241111,
    "amount": 78
  },
  {
    "date": 20241110,
    "amount": 36
  },
  {
    "date": 20241109,
    "amount": 43
  },
  {
    "date": 20241108,
    "amount": 48
  },
  {
    "date": 20241107,
    "amount": 64
  },
  {
    "date": 20241106,
    "amount": 44
  },
  {
    "date": 20241105,
    "amount": 57
  }
];

// Mock window.scrollTo
const mockScrollTo = vi.fn();

// Mock CONFIG and URL
global.CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
};

global.URL = 'http://test-api.com';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      <DefaultProvider>
        {component}
      </DefaultProvider>
    </BrowserRouter>
  );
};

describe("Dates Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = mockScrollTo;
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  it("renders the component with initial data", async () => {
    axios.get.mockResolvedValueOnce({ data: mockDatesData });
    renderWithRouter(<Dates tld="nu" />);
    await waitFor(() => {
      expect(screen.getByText("20241214")).toBeInTheDocument();
    });
  });

  it("loads more data when scrolling to bottom", async () => {
    axios.get.mockResolvedValueOnce({ data: mockDatesData });
    renderWithRouter(<Dates tld="nu" />);
    
    await waitFor(() => {
      expect(screen.getByText("20241214")).toBeInTheDocument();
    });

    // Simulate scrolling to bottom
    fireEvent.scroll(window, { target: { scrollY: 1000 } });
    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2);
    });
  });

  it("handles API errors gracefully", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    axios.get.mockRejectedValueOnce(new Error("API Error"));

    renderWithRouter(<Dates tld="nu" />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    consoleError.mockRestore();
  });

  it("toggles scroll to top visibility based on scroll position", async () => {
    // Mock the initial data load
    axios.get.mockResolvedValueOnce({ data: mockDatesData });
    renderWithRouter(<Dates tld="nu" />);

    // Wait for initial render
    await waitFor(() => {
      expect(screen.getByText("20241214")).toBeInTheDocument();
    });

    // Set pagefull to true to show the button
    Object.defineProperty(window, "scrollY", { value: 1000 });
    fireEvent.scroll(window);

    // Look for the button with both text and variant
    await waitFor(() => {
      const backToTopButton = screen.getByRole("button", { 
        name: /back to top/i,
        variant: "success"
      });
      expect(backToTopButton).toBeInTheDocument();
    });

    // Scroll back to top
    Object.defineProperty(window, "scrollY", { value: 0 });
    fireEvent.scroll(window);

    // Verify button is gone
    await waitFor(() => {
      const backToTopButton = screen.queryByRole("button", { 
        name: /back to top/i,
        variant: "success"
      });
      expect(backToTopButton).not.toBeInTheDocument();
    });
  });
});
