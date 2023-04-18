module.exports = (sequelize, DataTypes) => {
    const student = sequelize.define("student", {
        name: {
            type: DataTypes.STRING(50),
            unique: true,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Please enter your title"
                }
            }
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        roll: {
            type: DataTypes.INTEGER(50),
            allowNull: true,
        },
        chk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: "1"
        }
    },
        {
            timestamps: false,
            freezeTableName: true
        });

    student.associate = (models) => {
        // Join with studentInfo one to one
        student.hasOne(models.studentInfo, {
            foreignKey: 'studentId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            constraints: false,
        });
    }
    return student;
};