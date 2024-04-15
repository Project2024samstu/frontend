import styles from './Modal.module.scss'

export const Modal = ({ children, onClose }) => {
	return (
		<div className={styles.Overlay}>
			<div className={styles.Modal}>
				<button className={styles.Close} onClick={onClose}>
					&#215;
				</button>
				{children}
			</div>
		</div>
	)
}
