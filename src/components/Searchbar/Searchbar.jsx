import { Notify } from "notiflix";
import { Component } from "react"
import css from './Searchbar.module.css';

export class Searchbar extends Component {
    state = {
        query: ''
    };


    handleSubmit = (event) => {
        event.preventDefault();

        const { query } = this.state;
        const { onSubmit } = this.props;

        if (query.trim() === '') {
            Notify.info('Please enter some value to search');
            
        }

        onSubmit(query);

    };

    handleSearchChange = (event) => {
        this.setState(
            { query: event.currentTarget.value.toLowerCase() }
        );
    };

    render() {

        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={this.handleSubmit}>
                    <input
                        className={css.formInput}
                        value={this.query}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleSearchChange}
                    />
                    <button type="submit" className={css.searchButton}>
                        {/* <span className="button-label">Search</span> */}
                        <svg fill="none" height="25" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line> </svg>

                    </button>
                </form>
            </header>
        );
    }
}

