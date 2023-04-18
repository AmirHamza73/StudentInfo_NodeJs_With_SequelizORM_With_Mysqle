module.exports = (sequelize, DataTypes) => {
    const studentInfo = sequelize.define("studentInfo", {
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        fatherName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        motherName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
        {
            timestamps: false,
            freezeTableName: true
        });

    studentInfo.associate = (models) => {
        // Join with student one to one
        studentInfo.belongsTo(models.student, {
            foreignKey: 'studentId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            constraints: false,
        });
    }
    return studentInfo;
};