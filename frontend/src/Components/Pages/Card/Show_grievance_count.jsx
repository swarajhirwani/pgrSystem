import React from "react";

function Show_grievance_count({ name, count }) {
  return (
    <div class="card text-center bg-warning">
      <div class="card-header fw-bolder">{name}</div>
      <div class="card-body">
        <h5 class="card-title"></h5>
        <i class="bi bi-pencil-square display-4"></i>
      </div>
      <div class="card-footer fw-bolder fs-4">{count}</div>
    </div>
  );
}

export default Show_grievance_count;