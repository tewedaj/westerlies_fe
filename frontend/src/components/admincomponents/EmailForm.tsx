import "./StoreForm.css";
interface EmailForm {
  isOpen: boolean;
}
const EmailForm = (EmailForm: EmailForm) => {
  return (
    <div className={EmailForm.isOpen ? "email-form" : "email-form-disable"}>
      <form className="row">
        <div className="input-group mb-3">
          <span className="input-group-text">@</span>
          <input
            type="text"
            className="form-control"
            placeholder="email"
            aria-label="Server"
          />
          <button type="button" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailForm;
