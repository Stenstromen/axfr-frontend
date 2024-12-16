vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return actual;
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { DefaultProvider } from "../../contexts/default";
import Dates from "../Dates";

vi.mock("axios");

vi.mock("../../components/PageHeader", () => ({
  default: () => <div data-testid="mock-page-header">Page Header</div>
}));

vi.mock("../components/ScrollToTop", () => ({
  default: ({ isVisible, onClick }) => 
    isVisible ? (
      <div 
        data-testid="scroll-to-top-button" 
        onClick={onClick}
        className="scroll-to-top"
      >
        Mock ScrollToTop
      </div>
    ) : null
}));

const mockDatesDataPage0 = [
  { date: 20241215, amount: 17 },
  { date: 20241214, amount: 19 },
  { date: 20241213, amount: 52 },
  { date: 20241212, amount: 65 },
  { date: 20241211, amount: 82 },
  { date: 20241210, amount: 66 },
  { date: 20241209, amount: 60 },
  { date: 20241208, amount: 33 },
  { date: 20241207, amount: 23 },
  { date: 20241206, amount: 58 },
  { date: 20241205, amount: 52 },
  { date: 20241204, amount: 56 },
  { date: 20241203, amount: 62 },
  { date: 20241202, amount: 65 },
  { date: 20241201, amount: 44 },
  { date: 20241130, amount: 22 },
  { date: 20241129, amount: 52 },
  { date: 20241128, amount: 104 },
  { date: 20241127, amount: 72 },
  { date: 20241126, amount: 126 }
];

const mockDatesDataPage1 = [
  { date: 20241125, amount: 90 },
  { date: 20241124, amount: 39 },
  { date: 20241123, amount: 30 },
  { date: 20241122, amount: 45 },
  { date: 20241121, amount: 61 },
  { date: 20241120, amount: 81 },
  { date: 20241119, amount: 54 },
  { date: 20241118, amount: 84 },
  { date: 20241117, amount: 23 },
  { date: 20241116, amount: 21 },
  { date: 20241115, amount: 68 },
  { date: 20241114, amount: 95 },
  { date: 20241113, amount: 47 },
  { date: 20241112, amount: 67 },
  { date: 20241111, amount: 78 },
  { date: 20241110, amount: 36 },
  { date: 20241109, amount: 43 },
  { date: 20241108, amount: 48 },
  { date: 20241107, amount: 64 },
  { date: 20241106, amount: 44 }
];

const mockScrollTo = vi.fn();

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
    
    axios.get.mockImplementation((url) => {
      if (url.includes('/nu/0')) {
        return Promise.resolve({ data: mockDatesDataPage0 });
      }
      if (url.includes('/nu/1')) {
        return Promise.resolve({ data: mockDatesDataPage1 });
      }
      if (url.includes('/nu/2')) {
        return Promise.resolve({ data: null }); // This triggers pagefull = true
      }
      return Promise.reject(new Error('Invalid URL'));
    });
  });

  it("loads initial data and fetches more on scroll", async () => {
    renderWithRouter(<Dates tld="nu" />);

    await waitFor(() => {
      expect(screen.getByText("20241215")).toBeInTheDocument();
    });

    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    await waitFor(() => {
      expect(screen.getByText("20241125")).toBeInTheDocument();
    });
  });

  it("shows scroll to top button when scrolled down", async () => {
    renderWithRouter(<Dates tld="nu" />);

    await waitFor(() => {
      expect(screen.getByText("20241215")).toBeInTheDocument();
    });

    expect(screen.queryByTestId("scroll-to-top-button")).not.toBeInTheDocument();

    Object.defineProperty(window, "scrollY", { value: 301 });
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(screen.getByTestId("scroll-to-top-button")).toBeInTheDocument();
    });

    Object.defineProperty(window, "scrollY", { value: 0 });
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(screen.queryByTestId("scroll-to-top-button")).not.toBeInTheDocument();
    });
  });

  it("shows 'Back to top' button when pagefull is true", async () => {
    renderWithRouter(<Dates tld="nu" />);

    await waitFor(() => {
      expect(screen.getByText("20241215")).toBeInTheDocument();
    });

    fireEvent.scroll(window, { target: { scrollY: 1000 } });
    
    await waitFor(() => {
      expect(screen.getByText("20241125")).toBeInTheDocument();
    });

    fireEvent.scroll(window, { target: { scrollY: 2000 } });

    await waitFor(() => {
      const backToTopButton = screen.getByRole('button', { 
        name: /back to top/i 
      });
      expect(backToTopButton).toBeInTheDocument();
      expect(backToTopButton).toHaveClass('btn-success');
    });
  });
});
