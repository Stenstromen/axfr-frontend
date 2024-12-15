import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, ToggleButton, InputGroup, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function SearchControls({ 
  darkmode, 
  isMobile, 
  tlds, 
  tld, 
  query, 
  onTldChange, 
  onQueryChange, 
  onClearQuery 
}) {
  return (
    <>
      <ButtonGroup
        style={{
          width: "100%",
          paddingBottom: "10px",
          display: isMobile ? "none" : null,
        }}
      >
        {tlds.map((item) => (
          <ToggleButton
            key={item}
            variant="primary"
            onClick={() => onTldChange(item)}
            checked={tld === item}
            type="radio"
          >
            .{item.toUpperCase()}
          </ToggleButton>
        ))}
      </ButtonGroup>
      
      <InputGroup className="mb-3">
        <Form.Control
          style={{ color: darkmode ? "black" : "white" }}
          autoComplete="off"
          spellCheck="off"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          autoFocus
        />
        {query && isMobile && (
          <Button variant="light" onClick={onClearQuery}>
            <AiOutlineCloseCircle color="black" />
          </Button>
        )}
        <div style={{ display: !isMobile ? "none" : null }}>
          <DropdownButton
            variant="primary"
            title={tld ? "." + tld.toUpperCase() : "TLD"}
            id="input-group-dropdown-2"
            align="end"
          >
            {tlds.map((item) => (
              <Dropdown.Item
                key={item}
                onClick={() => onTldChange(item)}
                align="end"
              >
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
  darkmode: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  tlds: PropTypes.array.isRequired,
  tld: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  onTldChange: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onClearQuery: PropTypes.func.isRequired
};

export default SearchControls; 