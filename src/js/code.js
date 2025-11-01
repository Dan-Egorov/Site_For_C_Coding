// Real C programming tasks
        const availableTasks = [
            { 
                id: 1, 
                name: "Hello World Program", 
                description: "Create a program that prints 'Hello, World!' to the console.", 
                difficulty: "easy",
                hint: "Use printf function from stdio.h"
            },
            { 
                id: 2, 
                name: "Basic Calculator", 
                description: "Build a calculator that takes two numbers and an operator (+, -, *, /) and performs the operation.", 
                difficulty: "easy",
                hint: "Use switch statement for operator selection"
            },
            { 
                id: 3, 
                name: "Fibonacci Sequence", 
                description: "Generate the first n numbers in the Fibonacci sequence.", 
                difficulty: "medium",
                hint: "Use iterative approach with a loop"
            },
            { 
                id: 4, 
                name: "Prime Number Checker", 
                description: "Write a function to check if a number is prime and use it to print prime numbers up to 100.", 
                difficulty: "medium",
                hint: "Check divisibility from 2 to sqrt(n)"
            },
            { 
                id: 5, 
                name: "Array Sorting", 
                description: "Implement the bubble sort algorithm to sort an array of integers.", 
                difficulty: "medium",
                hint: "Use nested loops for comparison and swapping"
            },
            { 
                id: 6, 
                name: "File I/O Operations", 
                description: "Create a program that reads from one file and writes to another with modified content.", 
                difficulty: "hard",
                hint: "Use fopen, fread/fwrite, and fclose functions"
            },
            { 
                id: 7, 
                name: "Linked List Implementation", 
                description: "Implement a singly linked list with functions to add, delete, and traverse nodes.", 
                difficulty: "hard",
                hint: "Define a node structure with data and next pointer"
            },
            { 
                id: 8, 
                name: "Binary Search Tree", 
                description: "Create a binary search tree with insertion, deletion, and search operations.", 
                difficulty: "hard",
                hint: "Use recursive functions for tree operations"
            }
        ];

        const myTasks = [
            { 
                id: 9, 
                name: "Palindrome Checker", 
                description: "Write a function to check if a string is a palindrome.", 
                difficulty: "easy", 
                completed: false,
                hint: "Compare characters from start and end moving towards center"
            },
            { 
                id: 10, 
                name: "String Reverse", 
                description: "Implement a function to reverse a string without using library functions.", 
                difficulty: "easy", 
                completed: false,
                hint: "Swap characters from both ends"
            }
        ];

        // DOM Elements
        const availableTasksList = document.getElementById('available-tasks');
        const myTasksList = document.getElementById('my-tasks');
        const codeEditor = document.getElementById('code-editor');
        const runBtn = document.getElementById('run-btn');
        const saveBtn = document.getElementById('save-btn');

        // Render available tasks
        function renderAvailableTasks() {
            availableTasksList.innerHTML = '';
            
            if (availableTasks.length === 0) {
                availableTasksList.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-check-circle"></i>
                        <h3>All tasks added!</h3>
                        <p>You've added all available tasks to your list.</p>
                    </div>
                `;
                return;
            }
            
            availableTasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = 'task-item';
                taskItem.innerHTML = `
                    <div class="task-info">
                        <h3>${task.name}</h3>
                        <p>${task.description}</p>
                        <div class="task-meta">
                            <span class="difficulty ${task.difficulty}">${task.difficulty}</span>
                            <span><i class="fas fa-lightbulb"></i> Hint available</span>
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="btn btn-primary add-task" data-id="${task.id}">
                            <i class="fas fa-plus"></i> Add to My Tasks
                        </button>
                    </div>
                `;
                availableTasksList.appendChild(taskItem);
            });
        }

        // Render my tasks
        function renderMyTasks() {
            myTasksList.innerHTML = '';
            
            if (myTasks.length === 0) {
                myTasksList.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-tasks"></i>
                        <h3>No tasks yet</h3>
                        <p>Add some tasks from the Available Tasks section to get started.</p>
                    </div>
                `;
                return;
            }
            
            myTasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
                taskItem.innerHTML = `
                    <div class="task-info">
                        <h3>${task.name}</h3>
                        <p>${task.description}</p>
                        <div class="task-meta">
                            <span class="difficulty ${task.difficulty}">${task.difficulty}</span>
                            <span><i class="fas fa-lightbulb"></i> Hint available</span>
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="btn btn-success complete-task" data-id="${task.id}">
                            <i class="fas fa-${task.completed ? 'check' : 'check-double'}"></i> 
                            ${task.completed ? 'Completed' : 'Mark Complete'}
                        </button>
                        <button class="btn btn-danger remove-task" data-id="${task.id}">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                `;
                myTasksList.appendChild(taskItem);
            });
            
            updateProgress();
        }

        // Add task to my tasks
        function addToMyTasks(taskId) {
            const taskIndex = availableTasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                const task = availableTasks[taskIndex];
                myTasks.push({ ...task, completed: false });
                availableTasks.splice(taskIndex, 1);
                renderAvailableTasks();
                renderMyTasks();
            }
        }

        // Mark task as complete
        function completeTask(taskId) {
            const task = myTasks.find(t => t.id === taskId);
            if (task) {
                task.completed = !task.completed;
                renderMyTasks();
            }
        }

        // Remove task from my tasks
        function removeTask(taskId) {
            const taskIndex = myTasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                const task = myTasks[taskIndex];
                availableTasks.push({
                    id: task.id,
                    name: task.name,
                    description: task.description,
                    difficulty: task.difficulty,
                    hint: task.hint
                });
                myTasks.splice(taskIndex, 1);
                renderMyTasks();
                renderAvailableTasks();
            }
        }

        // Update progress stats
        function updateProgress() {
            const totalTasks = myTasks.length;
            const completedTasks = myTasks.filter(task => task.completed).length;
            const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
            
            // Update progress chart
            const chart = document.querySelector('.chart-placeholder');
            const chartText = document.querySelector('.chart-text');
            chart.style.background = `conic-gradient(var(--secondary) 0% ${progressPercentage}%, var(--light) ${progressPercentage}% 100%)`;
            chartText.textContent = `${progressPercentage}%`;
            
            // Update stats
            document.querySelector('.stat-card:nth-child(1) .stat-value').textContent = totalTasks;
            document.querySelector('.stat-card:nth-child(2) .stat-value').textContent = completedTasks;
            document.querySelector('.stat-card:nth-child(3) .stat-value').textContent = myTasks.filter(task => !task.completed).length;
            document.querySelector('.stat-card:nth-child(4) .stat-value').textContent = availableTasks.length;
        }

        // Event Listeners
        document.addEventListener('DOMContentLoaded', () => {
            renderAvailableTasks();
            renderMyTasks();
        });

        // Add task to my tasks
        availableTasksList.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-task') || e.target.closest('.add-task')) {
                const button = e.target.classList.contains('add-task') ? e.target : e.target.closest('.add-task');
                const taskId = parseInt(button.getAttribute('data-id'));
                addToMyTasks(taskId);
            }
        });

        // Complete or remove task
        myTasksList.addEventListener('click', (e) => {
            if (e.target.classList.contains('complete-task') || e.target.closest('.complete-task')) {
                const button = e.target.classList.contains('complete-task') ? e.target : e.target.closest('.complete-task');
                const taskId = parseInt(button.getAttribute('data-id'));
                completeTask(taskId);
            } else if (e.target.classList.contains('remove-task') || e.target.closest('.remove-task')) {
                const button = e.target.classList.contains('remove-task') ? e.target : e.target.closest('.remove-task');
                const taskId = parseInt(button.getAttribute('data-id'));
                removeTask(taskId);
            }
        });

        // Run code
        runBtn.addEventListener('click', () => {
            alert('Code execution simulated. In a real application, this would compile and run the C code.');
        });

        // Save code
        saveBtn.addEventListener('click', () => {
            alert('Code saved successfully!');
        });