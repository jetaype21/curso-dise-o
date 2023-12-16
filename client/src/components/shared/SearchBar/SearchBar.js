import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import "./SearchBar.css";
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      sortBy: "",
      categoryFilter: "default",
      levelFilter: "default",
    };
  }

  handleInputChange = (e) =>
    this.setState({ search: e.target.value }, () =>
      this.props.filterBySearch(this.state.search)
    );

  handleSortChange = (e) =>
    this.setState({ sortBy: e.target.value }, () =>
      this.props.sortBy(this.state.sortBy)
    );

  handleCategoryChange = (e) =>
    this.setState({ categoryFilter: e.target.value }, () =>
      this.props.filterByCategory(this.state.categoryFilter)
    );

  handleLevelChange = (e) =>
    this.setState({ levelFilter: e.target.value }, () =>
      this.props.filterByLevel(this.state.levelFilter)
    );

  render() {
    return (
      <Form className="mb-5 mt-5 filter-bar">
        <Form.Row>
          <Form.Group
            as={Col}
            md={
              this.props.filterByCategory && this.props.filterByLevel
                ? "4"
                : "6"
            }
            controlId="search"
          >
            <Form.Control
              type="text"
              name="search"
              placeholder="Search..."
              value={this.state.search}
              onChange={this.handleInputChange}
            />
          </Form.Group>

          {this.props.filterByCategory && this.props.filterByLevel ? (
            <>
              <Form.Group as={Col} md="3" controlId="categoryFilter">
                <Form.Control
                  as="select"
                  name="categoryFilter"
                  value={this.state.categoryFilter}
                  onChange={this.handleCategoryChange}
                >
                  <option value="default">Filtrar por categoria</option>
                  <option value="ETS">ETS</option>
                  <option value="PSICOLOGIA">PSICOLOGIA</option>
                  <option value="EDUCACION SEXUAL">EDUCACION SEXUAL</option>
                  <option value="BIENESTAR FAMILIAR">BIENESTAR FAMILIAR</option>
                  <option value="OTRO">OTRO</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} md="3" controlId="levelFilter">
                <Form.Control
                  as="select"
                  name="levelFilter"
                  value={this.state.levelFilter}
                  onChange={this.handleLevelChange}
                >
                  <option value="default">Filter by level</option>
                  <option>Seleccione una opcion</option>
                  <option value="SECONDARIA">Secondaria</option>
                  <option value="TECNOLOGICO">Tecnologico</option>
                  <option value="ESCOLARES">ESCOLARES</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} md="2" controlId="sortBy">
                <Form.Control
                  as="select"
                  name="sortBy"
                  value={this.state.sortBy}
                  onChange={this.handleSortChange}
                >
                  <option>Sort by...</option>
                  <option value="Name-A">Nombre A-Z</option>
                  <option value="Name-Z">Nombre Z-A</option>
                  <option value="Price-desc">Precio descendente</option>
                  <option value="Price-asc">Precio ascendente</option>
                </Form.Control>
              </Form.Group>
            </>
          ) : (
            <Form.Group as={Col} md="6" controlId="sortBy">
              <Form.Control
                as="select"
                name="sortBy"
                value={this.state.sortBy}
                onChange={this.handleSortChange}
              >
                <option>Ordenar por...</option>
                <option value="Name-A">Nombre A-Z</option>
                <option value="Name-Z">Nombre Z-A</option>
              </Form.Control>
            </Form.Group>
          )}
        </Form.Row>
      </Form>
    );
  }
}

export default SearchBar;
