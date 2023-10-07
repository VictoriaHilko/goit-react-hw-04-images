import css from './Button.module.css';

export const Button = ({ onLoadMore }) => {
    return (
        <button className={css.loadMoreButton}
            type="button"
            onClick={onLoadMore}>
            Load more
        </button>
    );
};