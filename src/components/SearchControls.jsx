import React from "react";
import PropTypes from "prop-types";
import {
  ButtonGroup,
  ToggleButton,
  InputGroup,
  Form,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";

function SearchControls({
  isMobile,
  tlds,
  tld,
  query,
  onTldChange,
  onQueryChange,
  onClearQuery,
}) {
  return (
    <>
      <div className="tld-pills" style={{ display: isMobile ? "none" : undefined }}>
        <ButtonGroup>
          {tlds.map((item) => (
            <ToggleButton
              key={item}
              variant="primary"
              onClick={() => onTldChange(item)}
              onChange={() => onTldChange(item)}
              checked={tld === item}
              type="radio"
            >
              .{item.toUpperCase()}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>

      <InputGroup className="mb-3">
        <Form.Control
          autoComplete="off"
          spellCheck="off"
          value={query}
          placeholder="Search domains…"
          onChange={(e) => onQueryChange(e.target.value)}
          autoFocus
        />
        {query && isMobile && (
          <Button variant="light" onClick={onClearQuery} aria-label="Clear search">
            <AiOutlineCloseCircle />
          </Button>
        )}
        <div style={{ display: !isMobile ? "none" : undefined }}>
          <DropdownButton
            variant="primary"
            title={tld ? "." + tld.toUpperCase() : "TLD"}
            id="input-group-dropdown-2"
            align="end"
          >
            {tlds.map((item) => (
              <Dropdown.Item key={item} onClick={() => onTldChange(item)} align="end">
                .{item.toUpperCase()}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
      </InputGroup>
    </>
  );
}

SearchControls.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  tlds: PropTypes.array.isRequired,
  tld: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  onTldChange: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onClearQuery: PropTypes.func.isRequired,
};

export default SearchControls;
