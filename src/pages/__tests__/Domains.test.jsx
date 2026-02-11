vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({
      param: "20241215"
    })
  };
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { DefaultProvider } from "../../contexts/default";
import Domains from "../Domains";

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

const mockDomainsDataPage0 = [
  { domain: "activemodesty.nu" },
  { domain: "allerup.nu" },
  { domain: "artimus.nu" },
  { domain: "aseaatom.nu" },
  { domain: "autoloupe.nu" },
  { domain: "babysitter.nu" },
  { domain: "beconsult.nu" },
  { domain: "bjornjakten.nu" },
  { domain: "bones.nu" },
  { domain: "byggnotis.nu" },
  { domain: "byggnotiser.nu" },
  { domain: "centralatrafikskolan.nu" },
  { domain: "dayforce.nu" },
  { domain: "dildon.nu" },
  { domain: "durables.nu" },
  { domain: "ebrn.nu" },
  { domain: "ekobrottmyndighet.nu" },
  { domain: "ekobrottsmyndighet.nu" },
  { domain: "ekobrottsmyndighetens.nu" },
  { domain: "ekobrottsutredare.nu" },
];

const mockDomainsDataPage1 = [
  { domain: "ekonomiskabrott.nu" },
  { domain: "elup.nu" },
  { domain: "energiecanvas.nu" },
  { domain: "fastighetsekonomi.nu" },
  { domain: "formark.nu" },
  { domain: "fullriggeren.nu" },
  { domain: "gotteriet.nu" },
  { domain: "grafton.nu" },
  { domain: "granitgruppen.nu" },
  { domain: "grr.nu" },
  { domain: "gummicentralen.nu" },
  { domain: "gymleco.nu" },
  { domain: "hellman.nu" },
  { domain: "hogakustenflyg.nu" },
  { domain: "infinium.nu" },
  { domain: "jozwiak.nu" },
  { domain: "julklappsspel.nu" },
  { domain: "kaif.nu" },
  { domain: "klassenskokbok.nu" },
  { domain: "kololi.nu" },
];

const mockScrollTo = vi.fn();

global.CONFIG = {
  headers: {
    "Content-Type": "application/json"
  }
};

global.URL = "http://test-api.com";

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      <DefaultProvider>
        {component}
      </DefaultProvider>
    </BrowserRouter>
  );
};

describe("Domains Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = mockScrollTo;
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    
    global.fetch = vi.fn((url) => {
      if (url.includes("/nudomains/20241215/0")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockDomainsDataPage0),
        });
      }
      if (url.includes("/nudomains/20241215/1")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockDomainsDataPage1),
        });
      }
      if (url.includes("/nudomains/20241215/2")) {
        return Promise.resolve({
          json: () => Promise.resolve(null),
        });
      }
      return Promise.reject(new Error("Invalid URL"));
    });
  });

  it("loads initial data and fetches more on scroll", async () => {
    renderWithRouter(<Domains tld="nu" url="nudomains" />);

    await waitFor(() => {
      expect(screen.getByText("activemodesty.nu")).toBeInTheDocument();
    });

    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    await waitFor(() => {
      expect(screen.getByText("ekonomiskabrott.nu")).toBeInTheDocument();
    });
  });

  it("shows scroll to top button when scrolled down", async () => {
    renderWithRouter(<Domains tld="nu" url="nudomains" />);

    await waitFor(() => {
      expect(screen.getByText("activemodesty.nu")).toBeInTheDocument();
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
    renderWithRouter(<Domains tld="nu" url="nudomains" />);

    await waitFor(() => {
      expect(screen.getByText("activemodesty.nu")).toBeInTheDocument();
    });

    fireEvent.scroll(window, { target: { scrollY: 1000 } });
    
    await waitFor(() => {
      expect(screen.getByText("ekonomiskabrott.nu")).toBeInTheDocument();
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
