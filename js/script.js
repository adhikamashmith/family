const familyData = {
    id: 1,
    husband: { name: "Adhikam Balesham", image: "assets/images/tatha.jpeg", role: "Patriarch" },
    wife: { name: "Adhikam Padam", image: "assets/images/nanamamma.jpeg", role: "Matriarch" },
    children: [
        {
            id: 2,
            husband: { name: "Adhikam Ramu", image: "assets/images/ramu1.jpeg", role: "Son" },
            wife: { name: "Adhikam Rama", image: "assets/images/rama.jpeg", role: "Daughter-in-law" },
            children: [
                {
                    id: 3,
                    husband: { name: "Adhikam Saikethan", image: "assets/images/saikethan.jpeg", role: "Grandson" },
                    wife: null,
                    children: []
                },
                {
                    id: 4,
                    husband: { name: "Adhikam Ashmith", image: "assets/images/ashmith.jpeg", role: "Grandson" },
                    wife: null,
                    children: []
                }
            ]
        }
    ]
};

function createCoupleCard(family) {
    const card = document.createElement("div");
    card.classList.add("couple-card");

    const photosContainer = document.createElement("div");
    photosContainer.classList.add("couple-photos");

    // Add Husband
    photosContainer.appendChild(createPersonNode(family.husband));

    // Add Wife if exists
    if (family.wife && family.wife.name) {
        photosContainer.appendChild(createPersonNode(family.wife));
    }

    card.appendChild(photosContainer);

    // Children logic
    if (family.children && family.children.length > 0) {
        const childrenContainer = document.createElement("div");
        childrenContainer.classList.add("children-container");

        family.children.forEach(child => {
            childrenContainer.appendChild(createCoupleCard(child));
        });

        card.addEventListener("click", (e) => {
            e.stopPropagation();
            childrenContainer.classList.toggle("show");
        });

        card.appendChild(childrenContainer);
    }

    return card;
}

function createPersonNode(person) {
    const personDiv = document.createElement("div");
    personDiv.classList.add("person");
    personDiv.innerHTML = `
        <img src="${person.image}" alt="${person.name}" onerror="this.src='https://via.placeholder.com/150'">
        <div class="person-name">${person.name}</div>
    `;
    personDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        showProfile(person);
    });
    return personDiv;
}

function showProfile(person) {
    const profileSection = document.getElementById("profile-section");
    profileSection.style.opacity = 0;
    
    setTimeout(() => {
        profileSection.innerHTML = `
            <h2 style="color: #c6a74e">${person.name}</h2>
            <p style="font-style: italic; color: #94a3b8;">${person.role || "Family Member"}</p>
            <img src="${person.image}" alt="${person.name}" onerror="this.src='https://via.placeholder.com/150'">
            <p>Member of the honorable Adhikam Family lineage. Dedicated to preserving our shared history.</p>
        `;
        profileSection.style.opacity = 1;
    }, 200);
}

function renderTree() {
    const tree = document.getElementById("family-tree");
    if (tree) tree.appendChild(createCoupleCard(familyData));
}






document.addEventListener("DOMContentLoaded", renderTree);