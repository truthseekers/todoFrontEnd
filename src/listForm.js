<form onSubmit={handleSubmit}>
  <label>
    <input
      placeholder="Create a new List"
      type="text"
      value={taskField}
      onChange={handleChange}
      name="name"
    />
  </label>
  <input type="submit" value="Submit" />
</form>;
