vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return actual;
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { DefaultProvider } from "../../contexts/default";
import Search from "../Search";

// Mock PageHeader component
vi.mock("../../components/PageHeader", () => ({
  default: () => <div data-testid="mock-page-header">Page Header</div>
}));

const mockSearchResults = [
  { domain: "coolcat.se" },
  { domain: "coolcats.se" },
  { domain: "coolcation.se" },
  { domain: "coolcations.se" },
  { domain: "coolcatcooler.se" },
  { domain: "thecoolcation.se" },
  { domain: "coolcationlodge.se" },
  { domain: "coolcatscattery.se" },
  { domain: "coolcationhotels.se" },
  { domain: "coolcationnordic.se" },
  { domain: "coolcationnortic.se" },
  { domain: "coolcationsweden.se" },
  { domain: "coolcationtravel.se" },
  { domain: "thecoolcatcooler.se" },
  { domain: "coolcationglommen.se" },
  { domain: "coolcationtravels.se" },
  { domain: "coolcationinsweden.se" },
  { domain: "coolcationswedenwestcoast.se" }
];

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      <DefaultProvider>
        {component}
      </DefaultProvider>
    </BrowserRouter>
  );
};

describe("Search Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup fetch mock for search
    global.fetch = vi.fn((url) => {
      if (url.includes('/search/se/coolcat')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockSearchResults),
        });
      }
      return Promise.reject(new Error('Invalid URL'));
    });
  });

  it("performs search and displays results", async () => {
    renderWithRouter(<Search tlds={["se", "nu"]} />);

    // Get the search input by its role
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: "coolcat" } });

    // Wait for search results
    await waitFor(() => {
      expect(screen.getByText("coolcat.se")).toBeInTheDocument();
      expect(screen.getByText("coolcats.se")).toBeInTheDocument();
      expect(screen.getByText("coolcation.se")).toBeInTheDocument();
    });

    // Verify the number of results
    expect(screen.getByText(/18 found/)).toBeInTheDocument();
  });

  it("shows message for short queries", () => {
    renderWithRouter(<Search tlds={["se", "nu"]} />);

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: "co" } });

    expect(screen.getByText("Please enter at least 3 characters")).toBeInTheDocument();
  });

  it("shows no results message when search returns empty", async () => {
    // Mock empty search results
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    renderWithRouter(<Search tlds={["se", "nu"]} />);

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: "xyz123" } });

    await waitFor(() => {
      expect(screen.getByText("No results found")).toBeInTheDocument();
    });
  });

  it("allows switching TLD", async () => {
    renderWithRouter(<Search tlds={["se", "nu"]} />);

    // Find and click the NU radio button
    const nuButton = screen.getByRole('radio', { name: /.NU/i });
    fireEvent.click(nuButton);

    // Verify that the NU button is selected
    expect(nuButton).toBeChecked();
  });
}); 