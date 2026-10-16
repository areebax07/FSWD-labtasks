const student = {
    id: 101,
    name: 'Ali',
    marks: 0,
    scholarship: false,
    address: {
        city: 'Islamabad',
        sector: 'F-10'
    },
    contact: {
        email: 'ali@university.edu'
    }
};

const update = {
    name: 'Ali Khan',
    address: {
        city: 'Rawalpindi'
    },
    contact: {
        phone: '03001234567'
    }
};

function updateStudent(student, update, ...extraUpdates) {
    const { address: updatedAddress = {}, contact: updatedContact = {}, ...otherUpdates } = update;

    const { name: oldName = "Unknown", ...otherStudentData } = student;

    const { city: newCity = student.address.city } = updatedAddress;

    const { sector = student.address.sector } = student.address;

    const { email = "" } = student.contact;

    const { phone = student.contact.phone } = updatedContact;

    const [firstValue, secondValue = "Default"] = [update.name];

    const address = {
        ...student.address,
        ...updatedAddress,
        city: newCity,
        sector
    };

    const contact = {
        ...student.contact,
        ...updatedContact,
        email: email ?? "",
        phone: phone ?? ""
    };

    return {
        ...otherStudentData,
        name: update.name ?? oldName,
        ...otherUpdates,
        address,
        contact,
        ...Object.assign({}, ...extraUpdates)
    };
}

const updatedStudent = updateStudent(student, update);

console.log(updatedStudent);

console.log(student === updatedStudent);
console.log(student.address === updatedStudent.address);
console.log(student.contact === updatedStudent.contact);