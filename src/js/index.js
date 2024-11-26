const form = document.getElementById('productForm');
    const tableBody = document.getElementById('tableBody');

    // Função para salvar os dados no localStorage
    function saveToLocalStorage() {
      const rows = Array.from(tableBody.querySelectorAll('tr')).map(row => ({
        productName: row.cells[0].textContent,
        quantity: row.cells[1].textContent,
        location: row.cells[2].textContent
      }));
      localStorage.setItem('estoque', JSON.stringify(rows));
    }

    // Função para carregar os dados do localStorage
    function loadFromLocalStorage() {
      const data = JSON.parse(localStorage.getItem('estoque')) || [];
      data.forEach(item => addRowToTable(item.productName, item.quantity, item.location));
    }

    // Função para adicionar uma linha à tabela
    function addRowToTable(productName, quantity, location) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${productName}</td>
        <td>${quantity}</td>
        <td>${location}</td>
        <td><button class="remove-btn">Remover</button></td>
      `;
      tableBody.appendChild(row);
    }

    // Listener para o formulário
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const productName = document.getElementById('productName').value.trim();
      const quantity = document.getElementById('quantity').value.trim();
      const location = document.getElementById('location').value.trim();

      if (!productName || !quantity || !location) {
        alert('Preencha todos os campos!');
        return;
      }

      addRowToTable(productName, quantity, location);
      saveToLocalStorage(); // Atualiza o localStorage
      form.reset(); // Limpa o formulário
    });

    // Listener para remover itens da tabela
    tableBody.addEventListener('click', function (e) {
      if (e.target.classList.contains('remove-btn')) {
        e.target.closest('tr').remove();
        saveToLocalStorage(); // Atualiza o localStorage
      }
    });

    // Carrega os dados do localStorage ao abrir a página
    loadFromLocalStorage();
