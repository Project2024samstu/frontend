import styles from './Modal.module.scss'

export const Modal = ({ title, children, onClose }) => {
	return (
		<div className={styles.Overlay}>
			<div className={styles.Modal}>
				<div className={styles.Header}>
					<p>{title}</p>
					<button className={styles.Close} onClick={onClose}>
						&#215;
					</button>
				</div>
				{children}
			</div>
		</div>
	)
}
